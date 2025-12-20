'use server'

import { prisma } from '@/lib/prisma'
import { requireAuth, hashPassword, verifyPassword, getSession } from '@/lib/auth/session'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// Community Members Actions
export async function getCommunityMembers() {
  await requireAuth()

  try {
    const members = await prisma.communityMember.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return { success: true, members }
  } catch (error) {
    console.error('Error fetching community members:', error)
    return { success: false, error: 'Failed to fetch community members' }
  }
}

export async function updateCommunityMemberStatus(memberId: string, status: string) {
  await requireAuth()

  try {
    const member = await prisma.communityMember.update({
      where: { id: memberId },
      data: { status },
    })
    revalidatePath('/admin/community')
    return { success: true, member }
  } catch (error) {
    console.error('Error updating member status:', error)
    return { success: false, error: 'Failed to update member status' }
  }
}

export async function deleteCommunityMember(memberId: string) {
  await requireAuth()

  try {
    await prisma.communityMember.delete({
      where: { id: memberId },
    })
    revalidatePath('/admin/community')
    return { success: true }
  } catch (error) {
    console.error('Error deleting member:', error)
    return { success: false, error: 'Failed to delete member' }
  }
}

// Category Actions
const categorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  description: z.string().optional(),
})

export async function getCategories() {
  await requireAuth()

  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { courses: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return { success: true, categories }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return { success: false, error: 'Failed to fetch categories' }
  }
}

export async function createCategory(data: FormData) {
  await requireAuth()

  try {
    const rawData = {
      name: data.get('name') as string,
      slug: data.get('slug') as string,
      description: data.get('description') as string || undefined,
    }

    const validatedData = categorySchema.parse(rawData)

    const category = await prisma.category.create({
      data: validatedData,
    })

    revalidatePath('/admin/categories')
    return { success: true, category }
  } catch (error) {
    console.error('Error creating category:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      }
    }
    return { success: false, error: 'Failed to create category' }
  }
}

export async function updateCategory(categoryId: string, data: FormData) {
  await requireAuth()

  try {
    const rawData = {
      name: data.get('name') as string,
      slug: data.get('slug') as string,
      description: data.get('description') as string || undefined,
    }

    const validatedData = categorySchema.parse(rawData)

    const category = await prisma.category.update({
      where: { id: categoryId },
      data: validatedData,
    })

    revalidatePath('/admin/categories')
    return { success: true, category }
  } catch (error) {
    console.error('Error updating category:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      }
    }
    return { success: false, error: 'Failed to update category' }
  }
}

export async function deleteCategory(categoryId: string) {
  await requireAuth()

  try {
    // Check if category has courses
    const coursesCount = await prisma.course.count({
      where: { categoryId },
    })

    if (coursesCount > 0) {
      return {
        success: false,
        error: `Cannot delete category with ${coursesCount} course(s). Please reassign or delete the courses first.`
      }
    }

    await prisma.category.delete({
      where: { id: categoryId },
    })
    revalidatePath('/admin/categories')
    return { success: true }
  } catch (error) {
    console.error('Error deleting category:', error)
    return { success: false, error: 'Failed to delete category' }
  }
}

// Course Actions
const courseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  categoryId: z.string().min(1, 'Category is required'),
})

export async function getCourses() {
  await requireAuth()

  try {
    const courses = await prisma.course.findMany({
      include: {
        category: true,
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
    return { success: true, courses }
  } catch (error) {
    console.error('Error fetching courses:', error)
    return { success: false, error: 'Failed to fetch courses' }
  }
}

export async function createCourse(data: FormData) {
  await requireAuth()

  try {
    const rawData = {
      title: data.get('title') as string,
      description: data.get('description') as string,
      categoryId: data.get('categoryId') as string,
    }

    const validatedData = courseSchema.parse(rawData)

    const course = await prisma.course.create({
      data: validatedData,
    })

    revalidatePath('/admin/courses')
    return { success: true, course }
  } catch (error) {
    console.error('Error creating course:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      }
    }
    return { success: false, error: 'Failed to create course' }
  }
}

export async function updateCourse(courseId: string, data: FormData) {
  await requireAuth()

  try {
    const rawData = {
      title: data.get('title') as string,
      description: data.get('description') as string,
      categoryId: data.get('categoryId') as string,
    }

    const validatedData = courseSchema.parse(rawData)

    const course = await prisma.course.update({
      where: { id: courseId },
      data: validatedData,
    })

    revalidatePath('/admin/courses')
    return { success: true, course }
  } catch (error) {
    console.error('Error updating course:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      }
    }
    return { success: false, error: 'Failed to update course' }
  }
}

export async function deleteCourse(courseId: string) {
  await requireAuth()

  try {
    await prisma.course.delete({
      where: { id: courseId },
    })
    revalidatePath('/admin/courses')
    return { success: true }
  } catch (error) {
    console.error('Error deleting course:', error)
    return { success: false, error: 'Failed to delete course' }
  }
}

// Registration Actions
export async function getRegistrations() {
  await requireAuth()

  try {
    const registrations = await prisma.registration.findMany({
      include: {
        course: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return { success: true, registrations }
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return { success: false, error: 'Failed to fetch registrations' }
  }
}

export async function updateRegistrationStatus(registrationId: string, status: string) {
  await requireAuth()

  try {
    const registration = await prisma.registration.update({
      where: { id: registrationId },
      data: { status },
    })
    revalidatePath('/admin/registrations')
    return { success: true, registration }
  } catch (error) {
    console.error('Error updating registration status:', error)
    return { success: false, error: 'Failed to update registration status' }
  }
}

export async function updatePaymentStatus(registrationId: string, paymentStatus: string) {
  await requireAuth()

  try {
    const registration = await prisma.registration.update({
      where: { id: registrationId },
      data: { paymentStatus },
    })
    revalidatePath('/admin/registrations')
    return { success: true, registration }
  } catch (error) {
    console.error('Error updating payment status:', error)
    return { success: false, error: 'Failed to update payment status' }
  }
}

// Dashboard Stats
export async function getDashboardStats() {
  await requireAuth()

  try {
    const [
      totalCommunityMembers,
      pendingCommunityMembers,
      totalCategories,
      totalCourses,
      totalRegistrations,
      pendingRegistrations,
      recentMembers,
      recentRegistrations,
    ] = await Promise.all([
      prisma.communityMember.count(),
      prisma.communityMember.count({ where: { status: 'Pending' } }),
      prisma.category.count(),
      prisma.course.count(),
      prisma.registration.count(),
      prisma.registration.count({ where: { status: 'Pending' } }),
      prisma.communityMember.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          email: true,
          profession: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.registration.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          course: { select: { title: true } },
        },
      }),
    ])

    return {
      success: true,
      stats: {
        totalCommunityMembers,
        pendingCommunityMembers,
        totalCategories,
        totalCourses,
        totalRegistrations,
        pendingRegistrations,
        recentMembers,
        recentRegistrations,
      },
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return { success: false, error: 'Failed to fetch dashboard stats' }
  }
}

// Admin User Management Actions
const adminUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Confirm password is required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export async function getAdminUsers() {
  await requireAuth()

  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return { success: true, admins }
  } catch (error) {
    console.error('Error fetching admin users:', error)
    return { success: false, error: 'Failed to fetch admin users' }
  }
}

export async function createAdminUser(data: FormData) {
  await requireAuth()

  try {
    const rawData = {
      username: data.get('username') as string,
      password: data.get('password') as string,
    }

    const validatedData = adminUserSchema.parse(rawData)

    // Check if username already exists
    const existing = await prisma.admin.findUnique({
      where: { username: validatedData.username },
    })

    if (existing) {
      return { success: false, error: 'Username already exists' }
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password)

    const admin = await prisma.admin.create({
      data: {
        username: validatedData.username,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    })

    revalidatePath('/admin/users')
    return { success: true, admin }
  } catch (error) {
    console.error('Error creating admin user:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        fieldErrors: error.flatten().fieldErrors,
      }
    }
    return { success: false, error: 'Failed to create admin user' }
  }
}

export async function updateAdminUsername(adminId: string, data: FormData) {
  await requireAuth()

  try {
    const username = data.get('username') as string

    if (!username || username.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters' }
    }

    // Check if username already exists (excluding current admin)
    const existing = await prisma.admin.findFirst({
      where: {
        username,
        NOT: { id: adminId },
      },
    })

    if (existing) {
      return { success: false, error: 'Username already exists' }
    }

    const admin = await prisma.admin.update({
      where: { id: adminId },
      data: { username },
      select: {
        id: true,
        username: true,
        updatedAt: true,
      },
    })

    revalidatePath('/admin/users')
    return { success: true, admin }
  } catch (error) {
    console.error('Error updating admin user:', error)
    return { success: false, error: 'Failed to update admin user' }
  }
}

export async function deleteAdminUser(adminId: string) {
  await requireAuth()

  try {
    // Prevent deleting the last admin
    const adminCount = await prisma.admin.count()
    if (adminCount <= 1) {
      return { success: false, error: 'Cannot delete the last admin user' }
    }

    // Prevent self-deletion
    const session = await getSession()
    if (session && session.id === adminId) {
      return { success: false, error: 'Cannot delete your own account' }
    }

    await prisma.admin.delete({
      where: { id: adminId },
    })

    revalidatePath('/admin/users')
    return { success: true }
  } catch (error) {
    console.error('Error deleting admin user:', error)
    return { success: false, error: 'Failed to delete admin user' }
  }
}

export async function updatePassword(data: FormData) {
  const session = await requireAuth()

  try {
    const rawData = {
      currentPassword: data.get('currentPassword') as string,
      newPassword: data.get('newPassword') as string,
      confirmPassword: data.get('confirmPassword') as string,
    }

    const validatedData = updatePasswordSchema.parse(rawData)

    // Get current admin
    const admin = await prisma.admin.findUnique({
      where: { id: session.id },
    })

    if (!admin) {
      return { success: false, error: 'Admin not found' }
    }

    // Verify current password
    const isHashed = admin.password.startsWith('$2a$') || admin.password.startsWith('$2b$')
    let isValid = false

    if (isHashed) {
      isValid = await verifyPassword(validatedData.currentPassword, admin.password)
    } else {
      isValid = admin.password === validatedData.currentPassword
    }

    if (!isValid) {
      return { success: false, error: 'Current password is incorrect' }
    }

    // Hash new password
    const hashedPassword = await hashPassword(validatedData.newPassword)

    // Update password
    await prisma.admin.update({
      where: { id: session.id },
      data: { password: hashedPassword },
    })

    return { success: true, message: 'Password updated successfully' }
  } catch (error) {
    console.error('Error updating password:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      }
    }
    return { success: false, error: 'Failed to update password' }
  }
}
