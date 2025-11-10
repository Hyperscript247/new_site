import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import CommunitySection from "@/components/home/community-section";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
        <ContactInfo />
        <CommunitySection />
        <ContactForm />
    </div>
  )
}
