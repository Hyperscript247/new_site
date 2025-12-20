import { getCommunityMembers } from "@/app/actions/admin-actions"
import CommunityMembersTable from "@/components/admin/community-members-table"

export const dynamic = 'force-dynamic'

export default async function CommunityMembersPage() {
  const result = await getCommunityMembers()

  if (!result.success || !result.members) {
    return (
      <div className="p-4">
        <p className="text-red-500">Failed to load community members</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Community Members</h1>
        <p className="text-muted-foreground">
          Manage community member registrations and approvals
        </p>
      </div>

      <CommunityMembersTable members={result.members} />
    </div>
  )
}
