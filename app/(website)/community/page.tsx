import CommunityHero from "@/components/community/community-hero"
import CommunityTerms from "@/components/community/community-terms"
import CommunityForm from "@/components/community/community-form"

export const metadata = {
  title: "Join Our Community | Hyperscript",
  description: "Join the Hyperscript community of tech professionals. Access job opportunities, mentorship, networking events, and wellness support.",
}

export default function CommunityPage() {
  return (
    <div className="flex flex-col">
      <CommunityHero />
      <CommunityTerms />
      <CommunityForm />
    </div>
  )
}
