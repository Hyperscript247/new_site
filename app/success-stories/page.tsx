import SuccessStoriesIntro from "@/components/success-stories/success-stories-intro"
import SuccessStoryList from "@/components/success-stories/success-story-list"
import Testimonials from "@/components/success-stories/testimonials"

export default function SuccessStoriesPage() {
  return (
    <div className="flex flex-col">
      <SuccessStoriesIntro />
      <SuccessStoryList />
      <Testimonials />
    </div>
  )
}
