import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-zinc-600 dark:text-zinc-400">页面未找到</p>
      <Link
        href="/"
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
      >
        返回首页
      </Link>
    </div>
  )
}
