import { prisma } from "@/lib/prisma"
import { getCourseRoadmap } from "@/app/actions/roadmap-actions"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import CourseRoadmap from "@/components/learning/course-roadmap"
import CourseRegistrationForm from "@/components/learning/course-registration-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      category: true,
    },
  })

  if (!course) {
    notFound()
  }

  const { roadmap } = await getCourseRoadmap(id)

  return (
    <div className="min-h-screen py-12">
      <div className="container px-4 md:px-6 max-w-5xl">
        {/* Back button */}
        <Link href="/#courses">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </Link>

        {/* Course Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {course.category.name}
                </Badge>
                <CardTitle className="text-3xl font-bold mb-2">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-lg">
                  {course.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CourseRegistrationForm course={course} trigger={
              <Button size="lg" className="w-full sm:w-auto">
                Enroll Now
              </Button>
            } />
          </CardContent>
        </Card>

        {/* Course Roadmap */}
        {roadmap && roadmap.milestones.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
            <CourseRoadmap
              milestones={roadmap.milestones}
              isEnrolled={false}
            />
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Course curriculum is being prepared. Check back soon!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
