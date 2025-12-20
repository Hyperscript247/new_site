import { getRegistrations } from "@/app/actions/admin-actions"
import RegistrationsTable from "@/components/admin/registrations-table"

export const dynamic = 'force-dynamic'

export default async function RegistrationsPage() {
  const result = await getRegistrations()

  if (!result.success || !result.registrations) {
    return (
      <div className="p-4">
        <p className="text-red-500">Failed to load registrations</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Course Registrations</h1>
        <p className="text-muted-foreground">
          View and manage course registrations
        </p>
      </div>

      <RegistrationsTable registrations={result.registrations} />
    </div>
  )
}
