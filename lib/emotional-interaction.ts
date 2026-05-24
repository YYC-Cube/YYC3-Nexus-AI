// 情感化交互系统 - 心理学驱动的情感识别与表达
import { nlu } from "./natural-language-understanding"

export interface EmotionalState {
  primary: "anxiety" | "happy" | "confused" | "angry" | "calm" | "excited" | "frustrated"
  intensity: number // 0-1
  triggers: string[]
  timestamp: Date
}

export interface EmotionalResponse {
  emoji: string
  message: string
  tone: "warm" | "humor" | "encouraging" | "soothing"
  soundEffect?: string
  animation: "gentle" | "bounce" | "pulse" | "fade"
  color: string
}

export interface PsychologicalProfile {
  emotionalHistory: EmotionalState[]
  preferences: {
    responseStyle: "warm" | "humor" | "professional" | "casual"
    emojiFrequency: "high" | "medium" | "low"
  }
  adaptiveLevel: number // 学习适应程度 0-1
}

class EmotionalInteractionEngine {
  private profile: PsychologicalProfile = {
    emotionalHistory: [],
    preferences: {
      responseStyle: "warm",
      emojiFrequency: "medium",
    },
    adaptiveLevel: 0,
  }

  // 扩展的表情包库 - 覆盖更多情绪状态
  private emojiLibrary: Record<
    EmotionalState["primary"],
    {
      warm: string[]
      humor: string[]
      encouraging: string[]
      soothing: string[]
    }
  > = {
    anxiety: {
      warm: ["🤗", "🌟", "💖", "🌸", "☀️"],
      humor: ["🐱", "🐼", "🌈", "🦄", "🎈"],
      encouraging: ["💪", "🌱", "🔥", "⭐", "🚀"],
      soothing: ["🌊", "🍃", "🌙", "🕊️", "💙"],
    },
    happy: {
      warm: ["🎉", "🌻", "✨", "💫", "🌺"],
      humor: ["🎊", "🦄", "🌈", "🎈", "🎭"],
      encouraging: ["👏", "🏆", "🎯", "💎", "🌟"],
      soothing: ["😊", "🌼", "🦋", "🌷", "💐"],
    },
    confused: {
      warm: ["🤔", "💡", "🌱", "🧭", "🔍"],
      humor: ["🐔", "❓", "🌍", "🦉", "🎓"],
      encouraging: ["📚", "🗺️", "🔦", "🧠", "💭"],
      soothing: ["🤝", "🌟", "🕯️", "🌙", "⭐"],
    },
    angry: {
      warm: ["🌿", "🕊️", "💧", "🍃", "🌸"],
      humor: ["🐢", "🍃", "🌸", "🦥", "🐨"],
      encouraging: ["🌈", "☮️", "💚", "🌺", "🦋"],
      soothing: ["🌊", "🧘", "🍵", "🌙", "💜"],
    },
    calm: {
      warm: ["😌", "🌸", "☁️", "🌾", "🍀"],
      humor: ["🧘‍♀️", "🐚", "🦢", "🌿", "🍵"],
      encouraging: ["🌅", "🌄", "🌌", "🏔️", "🌳"],
      soothing: ["🌙", "⭐", "💫", "🌊", "🌺"],
    },
    excited: {
      warm: ["🎉", "✨", "🌟", "💖", "🎊"],
      humor: ["🎸", "🎪", "🎨", "🎭", "🎬"],
      encouraging: ["🚀", "💪", "🔥", "⚡", "🏆"],
      soothing: ["🦋", "🌈", "🌺", "🎈", "💐"],
    },
    frustrated: {
      warm: ["💪", "🌱", "🌟", "🤗", "💙"],
      humor: ["🦸", "🎯", "🧩", "🔧", "⚙️"],
      encouraging: ["💡", "🔥", "🚀", "⭐", "🌈"],
      soothing: ["🍃", "🌊", "☕", "🌙", "💜"],
    },
  }

  // 情感关键词映射
  private emotionalKeywords: Record<string, EmotionalState["primary"]> = {
    // 焦虑相关
    担心: "anxiety",
    紧张: "anxiety",
    害怕: "anxiety",
    压力: "anxiety",
    焦虑: "anxiety",
    不安: "anxiety",
    // 愉快相关
    开心: "happy",
    高兴: "happy",
    快乐: "happy",
    满意: "happy",
    喜欢: "happy",
    棒: "happy",
    // 困惑相关
    不懂: "confused",
    疑惑: "confused",
    困惑: "confused",
    不明白: "confused",
    迷茫: "confused",
    // 愤怒相关
    生气: "angry",
    愤怒: "angry",
    烦躁: "angry",
    不满: "angry",
    讨厌: "angry",
    // 沮丧相关
    沮丧: "frustrated",
    失望: "frustrated",
    难过: "frustrated",
    挫折: "frustrated",
    无助: "frustrated",
  }

  // 心理学驱动的情感识别
  async recognizeEmotion(userInput: string, context?: Record<string, unknown>): Promise<EmotionalState> {
    // 使用NLU进行情感分析
    const nluResult = await nlu.understand(userInput, context)

    // 基于关键词识别主要情绪
    let primary: EmotionalState["primary"] = "calm"
    let maxScore = 0
    const triggers: string[] = []

    for (const [keyword, emotion] of Object.entries(this.emotionalKeywords)) {
      if (userInput.includes(keyword)) {
        const score = 1
        if (score > maxScore) {
          maxScore = score
          primary = emotion
          triggers.push(keyword)
        }
      }
    }

    // 基于NLU情感分析结果调整
    if (nluResult.sentiment.emotions.length > 0) {
      const nluEmotion = nluResult.sentiment.emotions[0]
      if (nluEmotion === "愉悦") primary = "happy"
      if (nluEmotion === "沮丧") primary = "frustrated"
      if (nluEmotion === "困惑") primary = "confused"
    }

    // 基于标点符号识别情绪强度
    const exclamationCount = (userInput.match(/!/g) || []).length
    const questionCount = (userInput.match(/\?|？/g) || []).length

    let intensity = 0.5
    if (exclamationCount > 0) intensity += exclamationCount * 0.2
    if (questionCount > 0 && primary === "confused") intensity += questionCount * 0.15

    intensity = Math.min(1, intensity)

    const emotionalState: EmotionalState = {
      primary,
      intensity,
      triggers,
      timestamp: new Date(),
    }

    // 记录到历史
    this.profile.emotionalHistory.push(emotionalState)
    if (this.profile.emotionalHistory.length > 50) {
      this.profile.emotionalHistory = this.profile.emotionalHistory.slice(-50)
    }

    // 更新适应水平
    this.updateAdaptiveLevel()

    return emotionalState
  }

  // 生成情感化响应
  generateResponse(emotionalState: EmotionalState): EmotionalResponse {
    const { primary, intensity } = emotionalState
    const style = this.selectResponseStyle(emotionalState)

    // 选择表情包
    const emojiPool = this.emojiLibrary[primary][style] || this.emojiLibrary[primary].warm
    const emoji = this.selectEmoji(emojiPool, intensity)

    // 生成消息
    const message = this.generateMessage(primary, style, intensity)

    // 选择动画
    const animation = this.selectAnimation(primary, intensity)

    // 选择颜色
    const color = this.selectColor(primary)

    // 选择音效
    const soundEffect = this.selectSoundEffect(primary)

    return {
      emoji,
      message,
      tone: style,
      soundEffect,
      animation,
      color,
    }
  }

  // 选择响应风格
  private selectResponseStyle(emotionalState: EmotionalState): "warm" | "humor" | "encouraging" | "soothing" {
    const { primary, intensity } = emotionalState

    // 基于用户偏好
    if (this.profile.preferences.responseStyle === "humor") {
      return "humor"
    }

    // 基于情绪状态选择
    if (primary === "anxiety" && intensity > 0.7) {
      return "soothing"
    }

    if (primary === "frustrated") {
      return "encouraging"
    }

    if (primary === "happy") {
      return intensity > 0.7 ? "humor" : "warm"
    }

    if (primary === "confused") {
      return "warm"
    }

    return "warm"
  }

  // 选择表情包
  private selectEmoji(emojiPool: string[], intensity: number): string {
    // 根据强度选择
    const index = Math.min(Math.floor(intensity * emojiPool.length), emojiPool.length - 1)
    return emojiPool[index]
  }

  // 生成消息
  private generateMessage(
    emotion: EmotionalState["primary"],
    style: EmotionalResponse["tone"],
    intensity: number,
  ): string {
    const messages: Record<EmotionalState["primary"], Record<EmotionalResponse["tone"], string[]>> = {
      anxiety: {
        warm: ["别担心，我会帮你的", "一步一步来，没问题的", "放轻松，我们一起解决"],
        humor: ["深呼吸，我们可以搞定这个小bug", "别慌，代码不会咬人的", "放松，我是你的AI助手"],
        encouraging: ["你可以的！让我们开始吧", "相信自己，我会支持你", "勇敢尝试，我在这里"],
        soothing: ["慢慢来，不着急", "一切都会好的", "我理解你的感受"],
      },
      happy: {
        warm: ["太棒了！继续保持", "很高兴能帮到你", "你做得很好"],
        humor: ["哇哦，你太厉害了！", "看来今天运气不错", "你是编程天才"],
        encouraging: ["继续加油！", "你正在进步", "越来越好了"],
        soothing: ["很开心看到你满意", "你的笑容很棒", "保持这份好心情"],
      },
      confused: {
        warm: ["让我帮你理清思路", "我们一起来看看", "别着急，慢慢来"],
        humor: ["没关系，连我都会困惑", "这个问题确实有点绕", "让我们解开这个谜题"],
        encouraging: ["提问是学习的开始", "好奇心是进步的动力", "你问得很好"],
        soothing: ["慢慢理解就好", "一步一步来", "我会详细解释的"],
      },
      angry: {
        warm: ["我理解你的感受", "让我们冷静下来", "一起找找解决办法"],
        humor: ["深呼吸，代码只是代码", "要不我们休息一下", "换个角度试试"],
        encouraging: ["你可以克服这个困难", "困难是暂时的", "相信你能解决"],
        soothing: ["放松一下，慢慢来", "一切都会好起来的", "我会帮助你的"],
      },
      calm: {
        warm: ["很高兴为你服务", "让我们开始吧", "有什么可以帮你的"],
        humor: ["准备好了吗？出发！", "让我们创造些有趣的东西", "今天要做什么呢"],
        encouraging: ["让我们一起进步", "准备迎接挑战", "你准备好了"],
        soothing: ["慢慢来，不着急", "保持这份平静", "很好的状态"],
      },
      excited: {
        warm: ["你的热情很棒", "让我们开始吧", "一起创造吧"],
        humor: ["哇，满满的能量", "你的激情感染到我了", "让我们大干一场"],
        encouraging: ["保持这份热情", "你的动力很强", "继续冲"],
        soothing: ["记得适度休息", "保持节奏", "稳住节奏"],
      },
      frustrated: {
        warm: ["我理解你的挫折感", "别灰心，我们一起", "一切都会好的"],
        humor: ["bug总会被消灭的", "下一次就成功了", "失败是成功之母"],
        encouraging: ["你已经很努力了", "坚持就是胜利", "你可以做到的"],
        soothing: ["休息一下再来", "放松心情", "慢慢来"],
      },
    }

    const messagePool = messages[emotion][style]
    return messagePool[Math.floor(Math.random() * messagePool.length)]
  }

  // 选择动画效果
  private selectAnimation(emotion: EmotionalState["primary"], intensity: number): EmotionalResponse["animation"] {
    if (emotion === "happy" || emotion === "excited") {
      return intensity > 0.7 ? "bounce" : "pulse"
    }

    if (emotion === "anxiety" || emotion === "frustrated") {
      return "gentle"
    }

    return "fade"
  }

  // 选择颜色
  private selectColor(emotion: EmotionalState["primary"]): string {
    const colorMap: Record<EmotionalState["primary"], string> = {
      anxiety: "#6B9BD1", // 墨青色
      happy: "#7CC873", // 竹绿色
      confused: "#89A8D9", // 云蓝色
      angry: "#D4A574", // 琥珀色
      calm: "#95B8D1", // 淡蓝色
      excited: "#E67E8C", // 粉红色
      frustrated: "#A78BBF", // 薰衣草色
    }

    return colorMap[emotion] || "#6B9BD1"
  }

  // 选择音效
  private selectSoundEffect(emotion: EmotionalState["primary"]): string {
    const soundMap: Record<EmotionalState["primary"], string> = {
      anxiety: "soothing-tone.mp3",
      happy: "celebration.mp3",
      confused: "hint-tone.mp3",
      angry: "calm-water.mp3",
      calm: "ambient-peace.mp3",
      excited: "energetic-pop.mp3",
      frustrated: "encouraging-bell.mp3",
    }

    return soundMap[emotion]
  }

  // 更新适应水平
  private updateAdaptiveLevel(): void {
    const recentEmotions = this.profile.emotionalHistory.slice(-10)

    // 计算情绪变化频率
    const emotionChanges = recentEmotions.reduce((acc, curr, idx) => {
      if (idx > 0 && curr.primary !== recentEmotions[idx - 1].primary) {
        return acc + 1
      }
      return acc
    }, 0)

    // 适应水平基于情绪稳定性
    this.profile.adaptiveLevel = Math.min(1, this.profile.adaptiveLevel + 0.01)

    // 如果情绪波动大，降低适应水平
    if (emotionChanges > 5) {
      this.profile.adaptiveLevel = Math.max(0, this.profile.adaptiveLevel - 0.05)
    }
  }

  // 获取用户心理画像
  getProfile(): PsychologicalProfile {
    return this.profile
  }

  // 设置用户偏好
  setPreferences(preferences: Partial<PsychologicalProfile["preferences"]>): void {
    this.profile.preferences = { ...this.profile.preferences, ...preferences }
  }

  // 重置系统
  reset(): void {
    this.profile = {
      emotionalHistory: [],
      preferences: {
        responseStyle: "warm",
        emojiFrequency: "medium",
      },
      adaptiveLevel: 0,
    }
  }
}

export const emotionalEngine = new EmotionalInteractionEngine()
