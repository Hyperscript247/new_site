'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Form schema with validation
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  courseId: z.string(),
  availability: z.enum(["Weekdays", "Weekends", "Both"]),
  experienceLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
})

export async function submitCourseRegistration(data: FormData) {
  try {
    // Extract form data
    const rawData = {
      fullName: data.get('fullName') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      location: data.get('location') as string,
      courseId: data.get('courseId') as string,
      availability: data.get('availability') as string,
      experienceLevel: data.get('experienceLevel') as string,
    };
    
    // Validate form data
    const validatedData = formSchema.parse(rawData);

    // Create registration in database
    const registration = await prisma.registration.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        location: validatedData.location,
        availability: validatedData.availability,
        experienceLevel: validatedData.experienceLevel,
        courseId: validatedData.courseId,
      },
      include: {
        course: true,
      }
    });
    return { success: true, registration };
  } catch (error) {
    console.error('Registration error:', error);
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
