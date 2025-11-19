import { getCourses } from "@/app/actions/admin-actions"
import CoursesTable from "@/components/admin/courses-table"

export const dynamic = 'force-dynamic'

export default async function CoursesPage() {
  const result = await getCourses()

  if (!result.success || !result.courses) {
    return (
      <div className="p-4">
        <p className="text-red-500">Failed to load courses</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Courses</h1>
        <p className="text-muted-foreground">
          Create, update, and manage courses
        </p>
      </div>

      <CoursesTable courses={result.courses} />
    </div>
  )
}
