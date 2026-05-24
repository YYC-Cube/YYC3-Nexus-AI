type EmotionKey = "anxiety" | "happy" | "confused" | "angry"
type StyleKey = "warm" | "humor"

function selectEmojiByEmotion(emotion: string, style: string) {
  const emojiLibrary: Record<EmotionKey, Record<StyleKey, string[]>> = {
    // 焦虑/压力状态
    anxiety: {
      warm: ["🤗", "🌟", "💖"], // 温柔关怀型
      humor: ["🐱", "🐼", "🌈"], // 幽默陪伴型
    },
    // 愉快/满意状态
    happy: {
      warm: ["🎉", "🌻", "✨"],
      humor: ["🎊", "🦄", "🌈"],
    },
    // 困惑/无助状态
    confused: {
      warm: ["🤔", "💡", "🌱"],
      humor: ["🐔", "❓", "🌍"],
    },
    // 愤怒/不满状态
    angry: {
      warm: ["🌿", "🕊️", "💧"],
      humor: ["🐢", "🍃", "🌸"],
    },
  }

  return emojiLibrary[emotion as EmotionKey]?.[style as StyleKey] || emojiLibrary[emotion as EmotionKey]?.warm || ["😊"]
}
