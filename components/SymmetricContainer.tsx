"use client"

interface SymmetricContainerProps {
  children: React.ReactNode
  className?: string
}

export function SymmetricContainer({ children, className = "" }: SymmetricContainerProps) {
  return (
    <div className={`w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}

interface SymmetricContentProps {
  children: React.ReactNode
  className?: string
}

export function SymmetricContent({ children, className = "" }: SymmetricContentProps) {
  return (
    <div className={`w-full bg-white dark:bg-zinc-900 rounded-xl ${className}`}>
      {children}
    </div>
  )
}
