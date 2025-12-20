"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitCommunityRegistration } from "@/app/actions/community-actions"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

const areasOfInterestOptions = [
  "Backend Development",
  "Frontend Development",
  "Cloud Computing",
  "Cybersecurity",
  "Data Science/Analytics",
  "Product Management",
  "UI/UX Design",
  "DevOps",
  "Mobile Development",
  "Machine Learning/AI",
  "Blockchain",
  "Quality Assurance",
]

const supportSeekingOptions = [
  "Job Opportunities",
  "Mentorship",
  "Networking",
  "Training & Skills Development",
  "Mental Wellness Support",
  "Events & Workshops",
  "Career Guidance",
]

const volunteerAreasOptions = [
  "Mentorship",
  "Event Planning",
  "Speaking/Presenting",
  "Content Creation",
  "Community Management",
  "Technical Support",
]

export default function CommunityForm() {
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})

  // State for checkbox groups
  const [areasOfInterest, setAreasOfInterest] = useState<string[]>([])
  const [supportSeeking, setSupportSeeking] = useState<string[]>([])
  const [willingToVolunteer, setWillingToVolunteer] = useState(false)
  const [areasToSupport, setAreasToSupport] = useState<string[]>([])
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [agreeToCommunications, setAgreeToCommunications] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')
    setFieldErrors({})

    try {
      const formData = new FormData(formRef.current!)

      // Add checkbox arrays to formData
      areasOfInterest.forEach(area => formData.append('areasOfInterest', area))
      supportSeeking.forEach(support => formData.append('supportSeeking', support))
      areasToSupport.forEach(area => formData.append('areasToSupport', area))
      formData.set('willingToVolunteer', willingToVolunteer.toString())
      formData.set('agreeToTerms', agreeToTerms.toString())
      formData.set('agreeToCommunications', agreeToCommunications.toString())

      const result = await submitCommunityRegistration(formData)

      if (result.success) {
        setSubmitStatus('success')
        formRef.current?.reset()
        // Reset state
        setAreasOfInterest([])
        setSupportSeeking([])
        setWillingToVolunteer(false)
        setAreasToSupport([])
        setAgreeToTerms(false)
        setAgreeToCommunications(false)
      } else {
        setSubmitStatus('error')
        setErrorMessage(result.error || 'An error occurred')
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors)
        }
      }
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage('An unexpected error occurred. Please try again.')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleCheckbox = (value: string, array: string[], setter: (arr: string[]) => void) => {
    if (array.includes(value)) {
      setter(array.filter(item => item !== value))
    } else {
      setter([...array, value])
    }
  }

  return (
    <section ref={ref} className="w-full py-20 md:py-32 bg-background">
      <div className="container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below to become a part of the Hyperscript community and unlock exclusive opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">Registration Successful!</h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Thank you for joining the Hyperscript community! We've sent a confirmation email to your inbox.
                  Your application is being processed and we'll get back to you shortly.
                </p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">Submission Failed</h3>
                <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
              </div>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-8 space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold border-b pb-2">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    required
                    className={fieldErrors.fullName ? 'border-red-500' : ''}
                  />
                  {fieldErrors.fullName && (
                    <p className="text-sm text-red-500">{fieldErrors.fullName[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className={fieldErrors.email ? 'border-red-500' : ''}
                  />
                  {fieldErrors.email && (
                    <p className="text-sm text-red-500">{fieldErrors.email[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp Number <span className="text-red-500">*</span></Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    required
                    className={fieldErrors.phone ? 'border-red-500' : ''}
                  />
                  {fieldErrors.phone && (
                    <p className="text-sm text-red-500">{fieldErrors.phone[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth (Day, Month) <span className="text-red-500">*</span></Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="text"
                    placeholder="15 March"
                    required
                    className={fieldErrors.dateOfBirth ? 'border-red-500' : ''}
                  />
                  {fieldErrors.dateOfBirth && (
                    <p className="text-sm text-red-500">{fieldErrors.dateOfBirth[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender (Optional)</Label>
                  <Select name="gender">
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                      <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profession">Profession <span className="text-red-500">*</span></Label>
                  <Input
                    id="profession"
                    name="profession"
                    placeholder="Software Engineer"
                    required
                    className={fieldErrors.profession ? 'border-red-500' : ''}
                  />
                  {fieldErrors.profession && (
                    <p className="text-sm text-red-500">{fieldErrors.profession[0]}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinProfile">LinkedIn Profile (Optional)</Label>
                <Input
                  id="linkedinProfile"
                  name="linkedinProfile"
                  type="url"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
            </div>

            {/* Community Engagement */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold border-b pb-2">Community Engagement</h3>

              <div className="space-y-2">
                <Label>Areas of Interest <span className="text-red-500">*</span></Label>
                <p className="text-sm text-muted-foreground mb-3">Select all that apply</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {areasOfInterestOptions.map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={`interest-${area}`}
                        checked={areasOfInterest.includes(area)}
                        onCheckedChange={() => toggleCheckbox(area, areasOfInterest, setAreasOfInterest)}
                      />
                      <label
                        htmlFor={`interest-${area}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {area}
                      </label>
                    </div>
                  ))}
                </div>
                {fieldErrors.areasOfInterest && (
                  <p className="text-sm text-red-500">{fieldErrors.areasOfInterest[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Type of Support You're Seeking <span className="text-red-500">*</span></Label>
                <p className="text-sm text-muted-foreground mb-3">Select all that apply</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {supportSeekingOptions.map((support) => (
                    <div key={support} className="flex items-center space-x-2">
                      <Checkbox
                        id={`support-${support}`}
                        checked={supportSeeking.includes(support)}
                        onCheckedChange={() => toggleCheckbox(support, supportSeeking, setSupportSeeking)}
                      />
                      <label
                        htmlFor={`support-${support}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {support}
                      </label>
                    </div>
                  ))}
                </div>
                {fieldErrors.supportSeeking && (
                  <p className="text-sm text-red-500">{fieldErrors.supportSeeking[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredEvents">Preferred Type of Events <span className="text-red-500">*</span></Label>
                <Select name="preferredEvents" required>
                  <SelectTrigger className={fieldErrors.preferredEvents ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select preferred event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Physical">Physical (In-person)</SelectItem>
                    <SelectItem value="Virtual">Virtual (Online)</SelectItem>
                    <SelectItem value="Hybrid">Hybrid (Both)</SelectItem>
                  </SelectContent>
                </Select>
                {fieldErrors.preferredEvents && (
                  <p className="text-sm text-red-500">{fieldErrors.preferredEvents[0]}</p>
                )}
              </div>
            </div>

            {/* Availability & Participation */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold border-b pb-2">Availability & Participation</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="willingToVolunteer"
                    checked={willingToVolunteer}
                    onCheckedChange={(checked) => setWillingToVolunteer(checked as boolean)}
                  />
                  <label
                    htmlFor="willingToVolunteer"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    I am willing to volunteer and contribute to the community
                  </label>
                </div>

                {willingToVolunteer && (
                  <div className="space-y-2 ml-6">
                    <Label>Areas You're Willing to Support</Label>
                    <p className="text-sm text-muted-foreground mb-3">Select all that apply</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {volunteerAreasOptions.map((area) => (
                        <div key={area} className="flex items-center space-x-2">
                          <Checkbox
                            id={`volunteer-${area}`}
                            checked={areasToSupport.includes(area)}
                            onCheckedChange={() => toggleCheckbox(area, areasToSupport, setAreasToSupport)}
                          />
                          <label
                            htmlFor={`volunteer-${area}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {area}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold border-b pb-2">Additional Information</h3>

              <div className="space-y-2">
                <Label htmlFor="howDidYouHear">How did you hear about us? (Optional)</Label>
                <Input
                  id="howDidYouHear"
                  name="howDidYouHear"
                  placeholder="Social media, friend, event, etc."
                />
              </div>
            </div>

            {/* Confirmation */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold border-b pb-2">Confirmation</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="text-sm font-medium leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    I agree to the <span className="text-primary">Terms of Engagement</span> and understand the expectations
                    and responsibilities of being a community member <span className="text-red-500">*</span>
                  </label>
                </div>
                {fieldErrors.agreeToTerms && (
                  <p className="text-sm text-red-500 ml-6">{fieldErrors.agreeToTerms[0]}</p>
                )}

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToCommunications"
                    checked={agreeToCommunications}
                    onCheckedChange={(checked) => setAgreeToCommunications(checked as boolean)}
                    className="mt-1"
                  />
                  <label
                    htmlFor="agreeToCommunications"
                    className="text-sm font-medium leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    I agree to receive community updates and communications via email and WhatsApp
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting || !agreeToTerms}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Join the Community'
                )}
              </Button>
              {!agreeToTerms && (
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Please agree to the Terms of Engagement to continue
                </p>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
