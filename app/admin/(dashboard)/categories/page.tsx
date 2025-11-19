import { getCategories } from "@/app/actions/admin-actions"
import CategoriesTable from "@/components/admin/categories-table"

export default async function CategoriesPage() {
  const result = await getCategories()

  if (!result.success) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-300">
            {result.error || "Failed to load categories"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Categories</h1>
        <p className="text-muted-foreground mt-2">
          Manage course categories
        </p>
      </div>

      <CategoriesTable categories={result.categories} />
    </div>
  )
}
