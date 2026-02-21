import { getCourseRoadmap } from "@/app/actions/roadmap-actions"
import { prisma } from "@/lib/prisma"
import RoadmapBuilder from "@/components/admin/roadmap-builder"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function CourseRoadmapPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const course = await prisma.course.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
    },
  })

  if (!course) {
    notFound()
  }

  const { roadmap } = await getCourseRoadmap(id)

  return (
    <div className="space-y-6">
      <RoadmapBuilder
        courseId={course.id}
        courseName={course.title}
        roadmap={roadmap}
      />
    </div>
  )
}
