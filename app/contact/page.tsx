import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <ContactInfo />
      <ContactForm />
    </div>
  )
}
