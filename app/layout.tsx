import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#0C70F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "YYC³ NexusAI - 智能中枢平台",
  description:
    "YYC³ NexusAI — 多模型聚合的下一代智能开发与对话中枢平台 | Multi-Model Aggregation · Next-Gen Intelligent Development & Conversation Hub",
  metadataBase: new URL("https://nexus-ai.yyc3.top"),
  applicationName: "YYC³ NexusAI",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "YYC³ NexusAI",
  },
  manifest: "/yyc3-icons/pwa/manifest.json",
  icons: {
    icon: [
      { url: "/yyc3-icons/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/yyc3-icons/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/yyc3-icons/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/yyc3-icons/favicon/favicon.ico" },
      { url: "/yyc3-icons/webp/icon-192x192.webp", sizes: "192x192", type: "image/webp" },
    ],
    apple: [
      { url: "/yyc3-icons/ios/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/yyc3-icons/ios/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/yyc3-icons/ios/icon-1024.png", sizes: "1024x1024", type: "image/png" },
    ],
  },
  openGraph: {
    title: "YYC³ NexusAI",
    description: "多模型聚合的下一代智能开发与对话中枢平台",
    url: "https://nexus-ai.yyc3.top",
    siteName: "YYC³ NexusAI",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YYC³ NexusAI",
    description: "多模型聚合的下一代智能开发与对话中枢平台",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/yyc3-icons/ios/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/yyc3-icons/ios/icon-1024.png" />
      </head>
      <body className="font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
