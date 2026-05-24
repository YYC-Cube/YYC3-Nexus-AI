import React from "react";

interface GhostIconButtonProps {
  label: string
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function GhostIconButton({ label, children, onClick, className }: GhostIconButtonProps) {
  return (
    <button
      className="hidden rounded-full border border-zinc-200 bg-white/70 p-2 text-zinc-700 hover:bg-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 md:inline-flex dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-200"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}
