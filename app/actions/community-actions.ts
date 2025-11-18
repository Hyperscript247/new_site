'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendCommunityWelcomeEmail } from '@/lib/email'

// Form schema with validation
const communityFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  gender: z.string().optional(),
  profession: z.string().min(2, { message: "Profession is required" }),
  linkedinProfile: z.string().optional(),
  areasOfInterest: z.array(z.string()).min(1, { message: "Please select at least one area of interest" }),
  supportSeeking: z.array(z.string()).min(1, { message: "Please select at least one type of support" }),
  preferredEvents: z.enum(["Physical", "Virtual", "Hybrid"], { message: "Please select your preferred event type" }),
  willingToVolunteer: z.boolean(),
  areasToSupport: z.array(z.string()),
  howDidYouHear: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the Terms of Engagement" }),
  agreeToCommunications: z.boolean(),
})

export async function submitCommunityRegistration(data: FormData) {
  try {
    // Extract form data
    const rawData = {
      fullName: data.get('fullName') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      dateOfBirth: data.get('dateOfBirth') as string,
      gender: data.get('gender') as string || undefined,
      profession: data.get('profession') as string,
      linkedinProfile: data.get('linkedinProfile') as string || undefined,
      areasOfInterest: data.getAll('areasOfInterest') as string[],
      supportSeeking: data.getAll('supportSeeking') as string[],
      preferredEvents: data.get('preferredEvents') as string,
      willingToVolunteer: data.get('willingToVolunteer') === 'true',
      areasToSupport: data.getAll('areasToSupport') as string[],
      howDidYouHear: data.get('howDidYouHear') as string || undefined,
      agreeToTerms: data.get('agreeToTerms') === 'true',
      agreeToCommunications: data.get('agreeToCommunications') === 'true',
    };

    // Validate form data
    const validatedData = communityFormSchema.parse(rawData);

    // Create community member in database
    const member = await prisma.communityMember.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        dateOfBirth: validatedData.dateOfBirth,
        gender: validatedData.gender,
        profession: validatedData.profession,
        linkedinProfile: validatedData.linkedinProfile,
        areasOfInterest: validatedData.areasOfInterest,
        supportSeeking: validatedData.supportSeeking,
        preferredEvents: validatedData.preferredEvents,
        willingToVolunteer: validatedData.willingToVolunteer,
        areasToSupport: validatedData.areasToSupport,
        howDidYouHear: validatedData.howDidYouHear,
        agreeToTerms: validatedData.agreeToTerms,
        agreeToCommunications: validatedData.agreeToCommunications,
      },
    });

    // Send welcome email
    try {
      await sendCommunityWelcomeEmail({
        to: validatedData.email,
        name: validatedData.fullName,
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the registration if email fails
    }

    return { success: true, member };
  } catch (error) {
    console.error('Community registration error:', error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors
      };
    }
    return { success: false, error: 'Failed to submit registration' };
  }
}
