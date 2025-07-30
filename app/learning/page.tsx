import LearningHero from "@/components/learning/learning-hero"
import CourseList from "@/components/learning/course-list"

export default function LearningPage() {
  return (
    <div className="flex flex-col">
      <LearningHero />
      <CourseList />
    </div>
  )
}
