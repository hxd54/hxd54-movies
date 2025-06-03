import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { MoviesProvider } from "@/hooks/use-movies-provider"
import { AuthProvider } from "@/hooks/use-auth"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Movie Mood | Find the perfect movie for your mood",
  description: "Discover movies based on your current mood",
  keywords: "movies, mood, recommendations, film",
  icons: { icon: "/favicon.ico" },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <MoviesProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </MoviesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
