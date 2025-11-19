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
      id: 'admin-default',
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

  // Create sample courses
  const courses = await Promise.all([
    prisma.course.upsert({
      where: { id: 'course-web-dev' },
      update: {},
      create: {
        id: 'course-web-dev',
        title: 'Full Stack Web Development',
        description: 'Learn modern web development with React, Node.js, and PostgreSQL. Build real-world applications from scratch.',
        category: 'Web Development',
      },
    }),
    prisma.course.upsert({
      where: { id: 'course-data-science' },
      update: {},
      create: {
        id: 'course-data-science',
        title: 'Data Science with Python',
        description: 'Master data analysis, visualization, and machine learning using Python and popular libraries.',
        category: 'Data Science',
      },
    }),
    prisma.course.upsert({
      where: { id: 'course-cloud' },
      update: {},
      create: {
        id: 'course-cloud',
        title: 'Cloud Computing Fundamentals',
        description: 'Learn cloud architecture, deployment, and management with AWS, Azure, and Google Cloud.',
        category: 'Cloud Computing',
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
