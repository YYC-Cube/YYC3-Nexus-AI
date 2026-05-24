// components/tech/TechStackProvider.tsx
"use client"

import { ReactNode, createContext, useState } from 'react'

interface TechStack {
  ui: {
    components: string[]
    themes: string[]
    icons: string[]
  }
  frameworks: {
    frontend: string[]
    backend: string[]
    mobile: string[]
  }
  libraries: {
    state: string[]
    routing: string[]
    utility: string[]
  }
}

interface TechStackContextType {
  stack: TechStack
  addComponent: (category: keyof TechStack, item: string) => void
  removeComponent: (category: keyof TechStack, item: string) => void
}

const defaultTechStack: TechStack = {
  ui: {
    components: ['shadcn/ui', 'Tailwind CSS', 'Radix UI'],
    themes: ['default', 'dark', 'blue', 'purple'],
    icons: ['Lucide Icons']
  },
  frameworks: {
    frontend: ['React', 'Next.js', 'Vue', 'Angular'],
    backend: ['Node.js', 'Express', 'NestJS'],
    mobile: ['React Native', 'Flutter']
  },
  libraries: {
    state: ['Zustand', 'Redux', 'MobX'],
    routing: ['React Router', 'Next.js Router'],
    utility: ['Lodash', 'Date-fns', 'Axios']
  }
}

const TechStackContext = createContext<TechStackContextType | undefined>(undefined)

export function TechStackProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<TechStack>(defaultTechStack)

  const addComponent = (category: keyof TechStack, item: string) => {
    setStack(prev => {
      const categoryData = prev[category] as Record<string, string[]>
      const key = Object.keys(categoryData)[0]
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [key]: [...(categoryData[key] || []), item]
        }
      }
    })
  }

  const removeComponent = (category: keyof TechStack, item: string) => {
    setStack(prev => {
      const categoryData = prev[category] as Record<string, string[]>
      const key = Object.keys(categoryData)[0]
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [key]: (categoryData[key] || []).filter((i: string) => i !== item)
        }
      }
    })
  }

  return (
    <TechStackContext.Provider value={{ stack, addComponent, removeComponent }}>
      {children}
    </TechStackContext.Provider>
  )
}
