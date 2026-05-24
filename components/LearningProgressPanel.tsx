"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Target, Award, Clock, BookOpen, AlertCircle } from "lucide-react"
import { learningTracker } from "@/lib/learning-tracker"
import { contextAnalyzer } from "@/lib/context-analyzer"

export default function LearningProgressPanel() {
  const [stats, setStats] = useState<any>(null)
  const [progressSummary, setProgressSummary] = useState("")
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = () => {
    const statistics = learningTracker.getStatistics()
    const summary = contextAnalyzer.getProgressSummary()
    setStats(statistics)
    setProgressSummary(summary)
  }

  if (!stats) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="text-center text-sm text-zinc-500">加载学习进度中...</div>
      </div>
    )
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) return `${hours}小时${minutes}分钟`
    return `${minutes}分钟`
  }

  return (
    <div className="space-y-4">
      {/* 进度概览卡片 */}
      <div className="rounded-xl border border-zinc-200 bg-linear-to-br from-purple-50 to-blue-50 p-6 dark:border-zinc-800 dark:from-purple-950/20 dark:to-blue-950/20">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">📊 学习进度总览</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-purple-600 hover:underline dark:text-purple-400"
          >
            {showDetails ? "收起详情" : "查看详情"}
          </button>
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-white/80 p-4 dark:bg-zinc-900/80">
            <div className="mb-1 flex items-center gap-2 text-xs text-zinc-500">
              <TrendingUp className="h-4 w-4" />
              当前等级
            </div>
            <div className="text-xl font-bold">
              {stats.currentLevel === "beginner" && "🌱 初学者"}
              {stats.currentLevel === "intermediate" && "🌿 进阶"}
              {stats.currentLevel === "advanced" && "🌳 高级"}
            </div>
          </div>

          <div className="rounded-lg bg-white/80 p-4 dark:bg-zinc-900/80">
            <div className="mb-1 flex items-center gap-2 text-xs text-zinc-500">
              <BookOpen className="h-4 w-4" />
              已学主题
            </div>
            <div className="text-xl font-bold">{stats.totalTopics} 个</div>
          </div>

          <div className="rounded-lg bg-white/80 p-4 dark:bg-zinc-900/80">
            <div className="mb-1 flex items-center gap-2 text-xs text-zinc-500">
              <Target className="h-4 w-4" />
              平均掌握度
            </div>
            <div className="text-xl font-bold">{stats.averageMastery}%</div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div
                className="h-full bg-linear-to-r from-purple-500 to-blue-500"
                style={{ width: `${stats.averageMastery}%` }}
              />
            </div>
          </div>

          <div className="rounded-lg bg-white/80 p-4 dark:bg-zinc-900/80">
            <div className="mb-1 flex items-center gap-2 text-xs text-zinc-500">
              <Clock className="h-4 w-4" />
              学习时长
            </div>
            <div className="text-xl font-bold">{formatTime(stats.totalTime)}</div>
          </div>
        </div>

        {/* 详细信息 */}
        {showDetails && (
          <div className="mt-4 space-y-3 border-t border-zinc-200 pt-4 dark:border-zinc-700">
            {/* 擅长领域 */}
            {stats.strengths.length > 0 && (
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                  <Award className="h-4 w-4" />✅ 擅长领域
                </div>
                <div className="flex flex-wrap gap-2">
                  {stats.strengths.map((strength: string) => (
                    <span
                      key={strength}
                      className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 需要加强 */}
            {stats.weaknesses.length > 0 && (
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-orange-600 dark:text-orange-400">
                  <AlertCircle className="h-4 w-4" />
                  ⚠️ 需要加强
                </div>
                <div className="flex flex-wrap gap-2">
                  {stats.weaknesses.map((weakness: string) => (
                    <span
                      key={weakness}
                      className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                    >
                      {weakness}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 统计数据 */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-white/60 p-3 dark:bg-zinc-900/60">
                <div className="text-zinc-500">总错误数</div>
                <div className="text-lg font-semibold">{stats.totalErrors}</div>
              </div>
              <div className="rounded-lg bg-white/60 p-3 dark:bg-zinc-900/60">
                <div className="text-zinc-500">总提问数</div>
                <div className="text-lg font-semibold">{stats.totalQuestions}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 进度条文字版 */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="whitespace-pre-wrap text-sm">{progressSummary}</div>
      </div>
    </div>
  )
}
