import { PrismaClient } from '@prisma/client'
// Import bcryptjs for password hashing
// To install: npm install bcryptjs --legacy-peer-deps
// import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create default admin user
  // NOTE: For production, uncomment bcrypt lines and use hashed password
  const adminPassword = 'admin123' // Change this!
  // const hashedPassword = await bcrypt.hash(adminPassword, 10)

  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      // id will be auto-generated
      username: 'admin',
      password: adminPassword, // For production: use hashedPassword
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  console.log('✓ Admin user created:', admin.username)
  console.log('  Username: admin')
  console.log('  Password:', adminPassword)
  console.log('')
  console.log('⚠️  IMPORTANT: Change the default password after first login!')
  console.log('')

  // Create categories
  const webDevCategory = await prisma.category.upsert({
    where: { slug: 'web-development' },
    update: {},
    create: {
      id: 'cat-web-dev',
      name: 'Web Development',
      slug: 'web-development',
      description: 'Full-stack web development courses covering frontend, backend, and databases',
    },
  })

  const dataScienceCategory = await prisma.category.upsert({
    where: { slug: 'data-science' },
    update: {},
    create: {
      id: 'cat-data-science',
      name: 'Data Science',
      slug: 'data-science',
      description: 'Data analysis, machine learning, and AI courses',
    },
  })

  const cloudCategory = await prisma.category.upsert({
    where: { slug: 'cloud-computing' },
    update: {},
    create: {
      id: 'cat-cloud',
      name: 'Cloud Computing',
      slug: 'cloud-computing',
      description: 'Cloud infrastructure, deployment, and DevOps courses',
    },
  })

  const mobileDevCategory = await prisma.category.upsert({
    where: { slug: 'mobile-development' },
    update: {},
    create: {
      id: 'cat-mobile-dev',
      name: 'Mobile Development',
      slug: 'mobile-development',
      description: 'iOS and Android app development courses',
    },
  })

  console.log('✓ Created 4 categories')

  // Create sample courses
  const courses = await Promise.all([
    prisma.course.upsert({
      where: { id: 'course-web-dev' },
      update: {},
      create: {
        id: 'course-web-dev',
        title: 'Full Stack Web Development',
        slug: 'full-stack-web-development',
        description: 'Learn modern web development with React, Node.js, and PostgreSQL. Build real-world applications from scratch.',
        categoryId: webDevCategory.id,
      },
    }),
    prisma.course.upsert({
      where: { id: 'course-data-science' },
      update: {},
      create: {
        id: 'course-data-science',
        title: 'Data Science with Python',
        slug: 'data-science-with-python',
        description: 'Master data analysis, visualization, and machine learning using Python and popular libraries.',
        categoryId: dataScienceCategory.id,
      },
    }),
    prisma.course.upsert({
      where: { id: 'course-cloud' },
      update: {},
      create: {
        id: 'course-cloud',
        title: 'Cloud Computing Fundamentals',
        slug: 'cloud-computing-fundamentals',
        description: 'Learn cloud architecture, deployment, and management with AWS, Azure, and Google Cloud.',
        categoryId: cloudCategory.id,
      },
    }),
  ])

  console.log('✓ Created', courses.length, 'sample courses')
  console.log('')
  console.log('Seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Error during seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
