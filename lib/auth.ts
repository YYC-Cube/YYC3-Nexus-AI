// 用户认证管理系统
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  plan: "free" | "pro" | "team"
  createdAt: Date
  preferences: UserPreferences
  oauthProvider?: "github" | "wechat" | "google" | null
}

export interface UserPreferences {
  language: "zh-CN" | "en"
  theme: "light" | "dark" | "system"
  aiModel: string
  notifications: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

class AuthManager {
  private user: User | null = null
  private listeners: Set<(user: User | null) => void> = new Set()

  constructor() {
    if (typeof window !== "undefined") {
      this.loadUser()
    }
  }

  private loadUser(): void {
    try {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        this.user = JSON.parse(savedUser)
        this.notifyListeners()
      }
    } catch {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user")
      }
    }
  }

  private saveUser(): void {
    try {
      if (this.user) {
        localStorage.setItem("user", JSON.stringify(this.user))
      } else {
        localStorage.removeItem("user")
      }
    } catch {
      localStorage.removeItem("user")
    }
  }

  async register(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const existingUser = localStorage.getItem(`user_${email}`)
      if (existingUser) {
        return { success: false, error: "该邮箱已被注册" }
      }

      const newUser: User = {
        id: generateId(),
        email,
        name,
        plan: "free",
        createdAt: new Date(),
        preferences: {
          language: "zh-CN",
          theme: "system",
          aiModel: "deepseek",
          notifications: true,
        },
      }

      const hashedPassword = await hashPassword(password)
      localStorage.setItem(`user_${email}`, JSON.stringify({ email, passwordHash: hashedPassword }))

      this.user = newUser
      this.saveUser()
      this.notifyListeners()

      return { success: true }
    } catch {
      return { success: false, error: "注册失败,请稍后重试" }
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const savedCredentials = localStorage.getItem(`user_${email}`)
      if (!savedCredentials) {
        return { success: false, error: "用户不存在" }
      }

      const credentials = JSON.parse(savedCredentials)
      const hashedInput = await hashPassword(password)

      if (credentials.passwordHash && credentials.passwordHash !== hashedInput) {
        return { success: false, error: "密码错误" }
      }

      if (!credentials.passwordHash && credentials.password === password) {
        const hashedPassword = await hashPassword(password)
        localStorage.setItem(`user_${email}`, JSON.stringify({ email, passwordHash: hashedPassword }))
      }

      const savedUserData = localStorage.getItem(`user_data_${email}`)
      if (savedUserData) {
        this.user = JSON.parse(savedUserData)
      } else {
        this.user = {
          id: generateId(),
          email,
          name: email.split("@")[0],
          plan: "free",
          createdAt: new Date(),
          preferences: {
            language: "zh-CN",
            theme: "system",
            aiModel: "deepseek",
            notifications: true,
          },
        }
        localStorage.setItem(`user_data_${email}`, JSON.stringify(this.user))
      }

      this.saveUser()
      this.notifyListeners()

      return { success: true }
    } catch {
      return { success: false, error: "登录失败,请稍后重试" }
    }
  }

  // 退出登录
  logout(): void {
    this.user = null
    this.saveUser()
    this.notifyListeners()
  }

  // 获取当前用户
  getUser(): User | null {
    return this.user
  }

  // 更新用户信息
  updateUser(updates: Partial<User>): void {
    if (this.user) {
      this.user = { ...this.user, ...updates }
      this.saveUser()
      // 同步更新到用户数据存储
      if (this.user.email) {
        localStorage.setItem(`user_data_${this.user.email}`, JSON.stringify(this.user))
      }
      this.notifyListeners()
    }
  }

  // 更新用户偏好
  updatePreferences(preferences: Partial<UserPreferences>): void {
    if (this.user) {
      this.user.preferences = { ...this.user.preferences, ...preferences }
      this.saveUser()
      if (this.user.email) {
        localStorage.setItem(`user_data_${this.user.email}`, JSON.stringify(this.user))
      }
      this.notifyListeners()
    }
  }

  // 订阅用户变化
  subscribe(listener: (user: User | null) => void): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  // 通知所有监听者
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.user))
  }

  // 检查是否已认证
  isAuthenticated(): boolean {
    return this.user !== null
  }

  // 升级计划
  async upgradePlan(plan: "pro" | "team"): Promise<{ success: boolean; error?: string }> {
    if (!this.user) {
      return { success: false, error: "请先登录" }
    }

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 1500))

      this.user.plan = plan
      this.saveUser()
      this.notifyListeners()

      return { success: true }
    } catch (error) {
      return { success: false, error: "升级失败,请稍后重试" }
    }
  }

  async loginWithOAuth(
    provider: "github" | "wechat" | "google",
  ): Promise<{ success: boolean; error?: string; redirectUrl?: string }> {
    try {
      // 模拟OAuth流程
      const redirectUrls = {
        github: `https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&redirect_uri=${window.location.origin}/auth/callback/github`,
        wechat: `https://open.weixin.qq.com/connect/qrconnect?appid=YOUR_WECHAT_APPID&redirect_uri=${encodeURIComponent(window.location.origin + "/auth/callback/wechat")}&response_type=code&scope=snsapi_login`,
        google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=${window.location.origin}/auth/callback/google&response_type=code&scope=openid%20email%20profile`,
      }

      // 实际应用中应该跳转到OAuth提供商
      // window.location.href = redirectUrls[provider]

      // 模拟OAuth回调
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockOAuthUser: User = {
        id: generateId(),
        email: `user_${provider}@example.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
        plan: "free",
        createdAt: new Date(),
        oauthProvider: provider,
        preferences: {
          language: "zh-CN",
          theme: "system",
          aiModel: "deepseek",
          notifications: true,
        },
      }

      this.user = mockOAuthUser
      this.saveUser()
      this.notifyListeners()

      return { success: true, redirectUrl: "/" }
    } catch (error) {
      return { success: false, error: `${provider}登录失败,请稍后重试` }
    }
  }
}

export const authManager = new AuthManager()
