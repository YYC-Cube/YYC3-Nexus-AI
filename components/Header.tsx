"use client"
import { Asterisk } from "lucide-react"
import { useState } from "react"
import { useLocale } from "@/contexts/LocaleContext"

interface HeaderProps {
  createNewChat: () => void
  sidebarCollapsed: boolean
  setSidebarOpen: (v: boolean) => void
}

export default function Header({ createNewChat, sidebarCollapsed, setSidebarOpen }: HeaderProps) {
  const { t } = useLocale()
  const [selectedBot, setSelectedBot] = useState("GPT-4")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const chatbots = [
    { name: "GPT-4", icon: "🤖" },
    { name: "GPT-4 Turbo", icon: "⚡" },
    { name: "Claude 3 Sonnet", icon: "🎭" },
    { name: "Gemini Pro", icon: "💎" },
    { name: t("sidebar.aiAssistant"), icon: <Asterisk className="h-4 w-4" /> },
  ]

  return null // 保持空返回，因为顶部导航已在MainWorkspace中实现
}
