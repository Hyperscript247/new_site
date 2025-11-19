'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        category: true,
      },
      orderBy: {
        id: 'asc',
      },
    })
    return { courses }
  } catch (error) {
    return { error: 'Failed to fetch courses' }
  }
}

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return { categories }
  } catch (error) {
    return { error: 'Failed to fetch categories' }
  }
}

export async function getCoursesByCategory(categoryId: string) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        categoryId: categoryId,
      },
      include: {
        category: true,
      },
      orderBy: {
        id: 'asc',
      },
    })
    return { courses }
  } catch (error) {
    return { error: 'Failed to fetch courses' }
  }
}

export async function searchCourses(searchTerm: string) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        category: true,
      },
      orderBy: {
        id: 'asc',
      },
    })
    return { courses }
  } catch (error) {
    return { error: 'Failed to search courses' }
  }
}
