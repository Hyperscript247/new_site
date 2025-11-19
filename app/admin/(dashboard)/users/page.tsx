import { getAdminUsers } from "@/app/actions/admin-actions"
import AdminUsersTable from "@/components/admin/admin-users-table"

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  const result = await getAdminUsers()

  if (!result.success || !result.admins) {
    return (
      <div className="p-4">
        <p className="text-red-500">Failed to load admin users</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Users</h1>
        <p className="text-muted-foreground">
          Manage admin users and permissions
        </p>
      </div>

      <AdminUsersTable admins={result.admins} />
    </div>
  )
}
