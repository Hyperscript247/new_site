import type React from "react"
import { Inter, Geist as Geist_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geist = Geist_Sans({ subsets: ["latin"], variable: "--font-geist" })

export const metadata = {
  title: "Hyperscript Technologies",
  description: "Empowering organizations with advanced analytics, custom software solutions, and expert training.",
}

export default function RootLayout({
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
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
      </body>
      </html>
  )
}
