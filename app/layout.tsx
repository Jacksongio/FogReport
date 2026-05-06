import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ConvexClientProvider } from "@/components/convex-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FogReport - Military Conflict Simulation Platform",
  description: "Simulate military conflict scenarios and analyze international warfare with advanced AI-powered strategic insights.",
  icons: {
    shortcut: '/favicon.ico'
  },
  keywords: ["military simulation", "conflict analysis", "warfare strategy", "military planning", "geopolitics", "defense strategy"],
  generator: 'v0.dev',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" className="dark">
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"
          />
        </head>
        <body className={inter.className}>
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  )
}
