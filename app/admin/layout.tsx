import type React from "react"

export const metadata = {
  title: "Admin Dashboard | Hyperscript",
  description: "Admin dashboard for managing Hyperscript community and courses",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
