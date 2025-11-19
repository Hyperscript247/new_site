import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import AdminSidebar from "@/components/admin/admin-sidebar"

export const metadata = {
  title: "Admin Dashboard | Hyperscript",
  description: "Admin dashboard for managing Hyperscript community and courses",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar username={session.username} />
      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
