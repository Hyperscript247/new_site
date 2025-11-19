import { getDashboardStats } from "@/app/actions/admin-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, GraduationCap, FileText, Clock } from "lucide-react"
import { format } from "date-fns"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const result = await getDashboardStats()

  if (!result.success || !result.stats) {
    return (
      <div className="p-4">
        <p className="text-red-500">Failed to load dashboard data</p>
      </div>
    )
  }

  const { stats } = result

  const statCards = [
    {
      title: "Total Community Members",
      value: stats.totalCommunityMembers,
      subtitle: `${stats.pendingCommunityMembers} pending`,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
      subtitle: "Active courses",
      icon: GraduationCap,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Total Registrations",
      value: stats.totalRegistrations,
      subtitle: `${stats.pendingRegistrations} pending`,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Pending Actions",
      value: stats.pendingCommunityMembers + stats.pendingRegistrations,
      subtitle: "Require attention",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your community and courses
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.subtitle}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Community Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Recent Community Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentMembers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No members yet</p>
            ) : (
              <div className="space-y-4">
                {stats.recentMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{member.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.profession}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(member.createdAt), "MMM d, yyyy")}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          member.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : member.status === "Approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Registrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Recent Course Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentRegistrations.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No registrations yet
              </p>
            ) : (
              <div className="space-y-4">
                {stats.recentRegistrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{registration.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        {registration.course.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(registration.createdAt), "MMM d, yyyy")}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          registration.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : registration.status === "Approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                        }`}
                      >
                        {registration.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
