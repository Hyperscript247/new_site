'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Roadmap CRUD operations

export async function getCourseRoadmap(courseId: string) {
  try {
    const roadmap = await prisma.courseRoadmap.findUnique({
      where: { courseId },
      include: {
        milestones: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    })
    return { roadmap, success: true }
  } catch (error) {
    return { error: 'Failed to fetch roadmap', success: false }
  }
}

export async function createRoadmap(courseId: string, description?: string) {
  try {
    console.log('[createRoadmap] Starting roadmap creation for course:', courseId)

    // Check if roadmap already exists
    const existing = await prisma.courseRoadmap.findUnique({
      where: { courseId },
    })

    if (existing) {
      console.log('[createRoadmap] Roadmap already exists:', existing.id)
      return { error: 'A roadmap already exists for this course', success: false }
    }

    console.log('[createRoadmap] Creating new roadmap...')
    const roadmap = await prisma.courseRoadmap.create({
      data: {
        courseId,
        description,
      },
    })

    console.log('[createRoadmap] Roadmap created successfully:', roadmap.id)
    revalidatePath(`/admin/courses/${courseId}/roadmap`)
    revalidatePath(`/courses/${courseId}`)
    return { roadmap, success: true }
  } catch (error) {
    console.error('[createRoadmap] Error creating roadmap:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to create roadmap'
    return { error: errorMessage, success: false }
  }
}

export async function updateRoadmap(roadmapId: string, description?: string) {
  try {
    const roadmap = await prisma.courseRoadmap.update({
      where: { id: roadmapId },
      data: { description },
    })
    revalidatePath('/admin/courses')
    return { roadmap, success: true }
  } catch (error) {
    return { error: 'Failed to update roadmap', success: false }
  }
}

export async function deleteRoadmap(roadmapId: string) {
  try {
    await prisma.courseRoadmap.delete({
      where: { id: roadmapId },
    })
    revalidatePath('/admin/courses')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete roadmap', success: false }
  }
}

// Milestone CRUD operations

export async function createMilestone(data: {
  roadmapId: string
  title: string
  description: string
  type?: string
  durationWeeks?: number
  sortOrder?: number
  prerequisiteIds?: string[]
}) {
  try {
    const milestone = await prisma.milestone.create({
      data: {
        roadmapId: data.roadmapId,
        title: data.title,
        description: data.description,
        type: data.type || 'lesson',
        durationWeeks: data.durationWeeks || 1,
        sortOrder: data.sortOrder || 0,
        prerequisiteIds: data.prerequisiteIds || [],
      },
    })
    revalidatePath('/admin/courses')
    return { milestone, success: true }
  } catch (error) {
    return { error: 'Failed to create milestone', success: false }
  }
}

export async function updateMilestone(
  milestoneId: string,
  data: {
    title?: string
    description?: string
    type?: string
    durationWeeks?: number
    sortOrder?: number
    prerequisiteIds?: string[]
  }
) {
  try {
    const milestone = await prisma.milestone.update({
      where: { id: milestoneId },
      data,
    })
    revalidatePath('/admin/courses')
    return { milestone, success: true }
  } catch (error) {
    return { error: 'Failed to update milestone', success: false }
  }
}

export async function deleteMilestone(milestoneId: string) {
  try {
    await prisma.milestone.delete({
      where: { id: milestoneId },
    })
    revalidatePath('/admin/courses')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete milestone', success: false }
  }
}

export async function reorderMilestones(
  updates: { id: string; sortOrder: number }[]
) {
  try {
    await prisma.$transaction(
      updates.map((update) =>
        prisma.milestone.update({
          where: { id: update.id },
          data: { sortOrder: update.sortOrder },
        })
      )
    )
    revalidatePath('/admin/courses')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to reorder milestones', success: false }
  }
}

// Progress tracking

export async function markMilestoneComplete(
  registrationId: string,
  milestoneId: string
) {
  try {
    const completion = await prisma.milestoneCompletion.create({
      data: {
        registrationId,
        milestoneId,
      },
    })

    // Update overall course progress
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: {
        course: {
          include: {
            roadmap: {
              include: {
                milestones: true,
              },
            },
          },
        },
        completedMilestones: true,
      },
    })

    if (registration?.course.roadmap) {
      const totalMilestones = registration.course.roadmap.milestones.length
      const completedCount = registration.completedMilestones.length
      const progress = Math.round((completedCount / totalMilestones) * 100)

      await prisma.registration.update({
        where: { id: registrationId },
        data: { courseProgress: progress },
      })
    }

    revalidatePath('/courses')
    return { completion, success: true }
  } catch (error) {
    return { error: 'Failed to mark milestone complete', success: false }
  }
}

export async function unmarkMilestoneComplete(
  registrationId: string,
  milestoneId: string
) {
  try {
    await prisma.milestoneCompletion.delete({
      where: {
        registrationId_milestoneId: {
          registrationId,
          milestoneId,
        },
      },
    })

    // Update overall course progress
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: {
        course: {
          include: {
            roadmap: {
              include: {
                milestones: true,
              },
            },
          },
        },
        completedMilestones: true,
      },
    })

    if (registration?.course.roadmap) {
      const totalMilestones = registration.course.roadmap.milestones.length
      const completedCount = registration.completedMilestones.length
      const progress = Math.round((completedCount / totalMilestones) * 100)

      await prisma.registration.update({
        where: { id: registrationId },
        data: { courseProgress: progress },
      })
    }

    revalidatePath('/courses')
    return { success: true }
  } catch (error) {
    return { error: 'Failed to unmark milestone', success: false }
  }
}

export async function getStudentProgress(registrationId: string) {
  try {
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: {
        course: {
          include: {
            roadmap: {
              include: {
                milestones: {
                  orderBy: { sortOrder: 'asc' },
                },
              },
            },
          },
        },
        completedMilestones: {
          include: {
            milestone: true,
          },
        },
      },
    })

    if (!registration) {
      return { error: 'Registration not found', success: false }
    }

    return { registration, success: true }
  } catch (error) {
    return { error: 'Failed to fetch student progress', success: false }
  }
}
