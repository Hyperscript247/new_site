'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        id: 'asc',
      },
    })
    return { courses }
  } catch (error) {
    return { error: 'Failed to fetch courses' }
  }
}

export async function getCoursesByCategory(category: string) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        category: category,
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
      orderBy: {
        id: 'asc',
      },
    })
    return { courses }
  } catch (error) {
    return { error: 'Failed to search courses' }
  }
}

export async function seedCoursesData() {
  try {
    // First check if courses already exist to avoid duplicates
    const existingCourses = await prisma.course.count()

    if (existingCourses > 0) {
      return { message: 'Courses already seeded' }
    }

    // Sample course data
    const coursesData = [
      // Development courses
      {
        title: "Frontend Development",
        description: "Learn HTML, CSS, and JavaScript to build interactive user interfaces.",
        category: "Development"
      },
      {
        title: "Backend Development",
        description: "Master server-side programming with Node.js, Express, and databases.",
        category: "Development"
      },
      {
        title: "Full Stack Development",
        description: "Combine frontend and backend skills to build complete web applications.",
        category: "Development"
      },
      {
        title: "Mobile App Development",
        description: "Create native and cross-platform mobile apps for iOS and Android.",
        category: "Development"
      },
      {
        title: "Cloud Computing",
        description: "Learn to deploy and manage applications in cloud environments.",
        category: "Development"
      },
      {
        title: "DevOps",
        description: "Master continuous integration, deployment, and infrastructure automation.",
        category: "Development"
      },
      {
        title: "Software Testing and QA",
        description: "Learn testing methodologies to ensure software quality and reliability.",
        category: "Development"
      },
      {
        title: "Web Development",
        description: "Build modern, responsive websites with the latest web technologies.",
        category: "Development"
      },

      // Data & AI courses
      {
        title: "Data Analytics",
        description: "Learn to analyze and visualize data to extract meaningful insights.",
        category: "Data & AI"
      },
      {
        title: "Data Science & AI",
        description: "Master machine learning algorithms and artificial intelligence techniques.",
        category: "Data & AI"
      },
      {
        title: "Business Intelligence",
        description: "Transform raw data into actionable business insights using BI tools.",
        category: "Data & AI"
      },

      // Management courses
      {
        title: "Product Management",
        description: "Learn to define, develop, and launch successful products.",
        category: "Management"
      },
      {
        title: "Project Management",
        description: "Master methodologies to plan, execute, and deliver projects on time.",
        category: "Management"
      },
      {
        title: "Product Design",
        description: "Design user-centered products with a focus on usability and aesthetics.",
        category: "Management"
      },

      // Marketing courses
      {
        title: "Digital Marketing",
        description: "Learn strategies to promote products and services in the digital landscape.",
        category: "Marketing"
      }
    ]

    // Insert courses into database
    await prisma.course.createMany({
      data: coursesData,
    })

    revalidatePath('/learning')
    return { message: 'Courses seeded successfully' }
  } catch (error) {
    console.error('Error seeding courses:', error)
    return { error: 'Failed to seed courses' }
  }
}
