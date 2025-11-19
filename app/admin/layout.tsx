import type React from "react"
import { Inter, Geist as Geist_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "../globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geist = Geist_Sans({ subsets: ["latin"], variable: "--font-geist" })

export const metadata = {
  title: "Admin Dashboard | Hyperscript",
  description: "Admin dashboard for managing Hyperscript community and courses",
}

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geist.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
