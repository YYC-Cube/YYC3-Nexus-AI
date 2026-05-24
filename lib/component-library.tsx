"use client"

// 组件库系统 - 管理可复用组件和模板
export interface Component {
  id: string
  name: string
  category: string
  description: string
  code: string
  language: string
  preview?: string
  tags: string[]
  dependencies?: string[]
  author: string
  createdAt: Date
  updatedAt: Date
  downloads: number
  likes: number
}

export interface ComponentCategory {
  id: string
  name: string
  icon: string
  description: string
  count: number
}

export const componentCategories: ComponentCategory[] = [
  { id: "ui", name: "UI 组件", icon: "🎨", description: "按钮、输入框、卡片等基础 UI 组件", count: 0 },
  { id: "layout", name: "布局组件", icon: "📐", description: "网格、容器、分栏等布局组件", count: 0 },
  { id: "form", name: "表单组件", icon: "📝", description: "表单、验证、输入控件", count: 0 },
  { id: "data", name: "数据展示", icon: "📊", description: "表格、图表、列表等数据组件", count: 0 },
  { id: "navigation", name: "导航组件", icon: "🧭", description: "菜单、标签页、面包屑等导航", count: 0 },
  { id: "feedback", name: "反馈组件", icon: "💬", description: "提示、弹窗、加载等反馈组件", count: 0 },
  { id: "animation", name: "动画组件", icon: "✨", description: "过渡、动画效果组件", count: 0 },
  { id: "utility", name: "工具组件", icon: "🔧", description: "实用工具和辅助组件", count: 0 },
]

export const builtInComponents: Component[] = [
  {
    id: "button-primary",
    name: "主要按钮",
    category: "ui",
    description: "带有主题色的主要操作按钮",
    language: "react",
    code: `function PrimaryButton({ children, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: '600',
        color: 'white',
        background: disabled ? '#94a3b8' : '#3b82f6',
        border: 'none',
        borderRadius: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = '#2563eb'
      }}
      onMouseLeave={(e) => {
        if (!disabled) e.currentTarget.style.background = '#3b82f6'
      }}
    >
      {children}
    </button>
  )
}`,
    tags: ["按钮", "UI", "交互"],
    author: "系统",
    createdAt: new Date(),
    updatedAt: new Date(),
    downloads: 1250,
    likes: 89,
  },
  {
    id: "card-basic",
    name: "基础卡片",
    category: "ui",
    description: "带有阴影和圆角的卡片容器",
    language: "react",
    code: `function Card({ title, children, footer }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    }}>
      {title && (
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #e5e7eb',
          fontWeight: '600',
          fontSize: '18px',
        }}>
          {title}
        </div>
      )}
      <div style={{ padding: '20px' }}>
        {children}
      </div>
      {footer && (
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid #e5e7eb',
          background: '#f9fafb',
        }}>
          {footer}
        </div>
      )}
    </div>
  )
}`,
    tags: ["卡片", "UI", "容器"],
    author: "系统",
    createdAt: new Date(),
    updatedAt: new Date(),
    downloads: 2100,
    likes: 156,
  },
  {
    id: "input-text",
    name: "文本输入框",
    category: "form",
    description: "带有标签和验证的文本输入框",
    language: "react",
    code: `function TextInput({ label, value, onChange, placeholder, error }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#374151',
        }}>
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontSize: '16px',
          border: error ? '2px solid #ef4444' : '1px solid #d1d5db',
          borderRadius: '8px',
          outline: 'none',
          transition: 'border-color 0.2s',
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = '#3b82f6'
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = '#d1d5db'
        }}
      />
      {error && (
        <div style={{
          marginTop: '4px',
          fontSize: '14px',
          color: '#ef4444',
        }}>
          {error}
        </div>
      )}
    </div>
  )
}`,
    tags: ["输入框", "表单", "验证"],
    author: "系统",
    createdAt: new Date(),
    updatedAt: new Date(),
    downloads: 1890,
    likes: 142,
  },
  {
    id: "modal-dialog",
    name: "模态对话框",
    category: "feedback",
    description: "可关闭的模态对话框组件",
    language: "react",
    code: `function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null
  
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }} onClick={onClose}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
            {title}
          </h3>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#6b7280',
          }}>
            ×
          </button>
        </div>
        <div style={{ padding: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}`,
    tags: ["弹窗", "对话框", "反馈"],
    author: "系统",
    createdAt: new Date(),
    updatedAt: new Date(),
    downloads: 1650,
    likes: 128,
  },
  {
    id: "loading-spinner",
    name: "加载动画",
    category: "feedback",
    description: "旋转的加载指示器",
    language: "react",
    code: `function LoadingSpinner({ size = 40, color = '#3b82f6' }) {
  return (
    <div style={{
      width: size,
      height: size,
      border: \`4px solid \${color}20\`,
      borderTop: \`4px solid \${color}\`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
  )
}

// 添加 CSS 动画
const style = document.createElement('style')
style.textContent = \`
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
\`
document.head.appendChild(style)`,
    tags: ["加载", "动画", "反馈"],
    author: "系统",
    createdAt: new Date(),
    updatedAt: new Date(),
    downloads: 980,
    likes: 76,
  },
  {
    id: "tabs-navigation",
    name: "标签页导航",
    category: "navigation",
    description: "可切换的标签页组件",
    language: "react",
    code: `function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div>
      <div style={{
        display: 'flex',
        borderBottom: '2px solid #e5e7eb',
        gap: '8px',
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              padding: '12px 20px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
              fontWeight: activeTab === tab.id ? '600' : '400',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ padding: '20px' }}>
        {tabs.find(t => t.id === activeTab)?.content}
      </div>
    </div>
  )
}`,
    tags: ["标签页", "导航", "切换"],
    author: "系统",
    createdAt: new Date(),
    updatedAt: new Date(),
    downloads: 1420,
    likes: 103,
  },
]

export class ComponentLibrary {
  private components: Component[] = []
  private customComponents: Component[] = []

  constructor() {
    this.components = [...builtInComponents]
    this.loadCustomComponents()
  }

  // 获取所有组件
  getAllComponents(): Component[] {
    return [...this.components, ...this.customComponents]
  }

  // 按分类获取组件
  getComponentsByCategory(category: string): Component[] {
    return this.getAllComponents().filter((c) => c.category === category)
  }

  // 搜索组件
  searchComponents(query: string): Component[] {
    const q = query.toLowerCase()
    return this.getAllComponents().filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((tag) => tag.toLowerCase().includes(q)),
    )
  }

  // 获取单个组件
  getComponent(id: string): Component | null {
    return this.getAllComponents().find((c) => c.id === id) || null
  }

  // 添加自定义组件
  addComponent(component: Omit<Component, "id" | "createdAt" | "updatedAt" | "downloads" | "likes">): Component {
    const newComponent: Component = {
      ...component,
      id: Math.random().toString(36).slice(2),
      createdAt: new Date(),
      updatedAt: new Date(),
      downloads: 0,
      likes: 0,
    }

    this.customComponents.push(newComponent)
    this.saveCustomComponents()

    return newComponent
  }

  // 更新组件
  updateComponent(id: string, updates: Partial<Component>): boolean {
    const index = this.customComponents.findIndex((c) => c.id === id)
    if (index === -1) return false

    this.customComponents[index] = {
      ...this.customComponents[index],
      ...updates,
      updatedAt: new Date(),
    }

    this.saveCustomComponents()
    return true
  }

  // 删除组件
  deleteComponent(id: string): boolean {
    const index = this.customComponents.findIndex((c) => c.id === id)
    if (index === -1) return false

    this.customComponents.splice(index, 1)
    this.saveCustomComponents()
    return true
  }

  // 增加下载次数
  incrementDownloads(id: string): void {
    const component = this.getAllComponents().find((c) => c.id === id)
    if (component) {
      component.downloads++
      this.saveCustomComponents()
    }
  }

  // 点赞
  toggleLike(id: string): boolean {
    const component = this.getAllComponents().find((c) => c.id === id)
    if (!component) return false

    const liked = this.isLiked(id)
    if (liked) {
      component.likes--
      this.removeLike(id)
    } else {
      component.likes++
      this.addLike(id)
    }

    this.saveCustomComponents()
    return !liked
  }

  private isLiked(id: string): boolean {
    const likes = JSON.parse(localStorage.getItem("component-likes") || "[]")
    return likes.includes(id)
  }

  private addLike(id: string): void {
    const likes = JSON.parse(localStorage.getItem("component-likes") || "[]")
    likes.push(id)
    localStorage.setItem("component-likes", JSON.stringify(likes))
  }

  private removeLike(id: string): void {
    const likes = JSON.parse(localStorage.getItem("component-likes") || "[]")
    const filtered = likes.filter((likeId: string) => likeId !== id)
    localStorage.setItem("component-likes", JSON.stringify(filtered))
  }

  // 持久化自定义组件
  private saveCustomComponents(): void {
    try {
      localStorage.setItem("custom-components", JSON.stringify(this.customComponents))
    } catch (error) {
      console.error("[v0] Failed to save custom components:", error)
    }
  }

  // 加载自定义组件
  private loadCustomComponents(): void {
    try {
      const data = localStorage.getItem("custom-components")
      if (data) {
        this.customComponents = JSON.parse(data).map((c: Record<string, unknown>) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt),
        }))
      }
    } catch (error) {
      console.error("[v0] Failed to load custom components:", error)
    }
  }
}

// 全局组件库实例
let componentLibraryInstance: ComponentLibrary | null = null

export function getComponentLibrary(): ComponentLibrary {
  if (!componentLibraryInstance) {
    componentLibraryInstance = new ComponentLibrary()
  }
  return componentLibraryInstance
}
