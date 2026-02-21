import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const courses = await prisma.course.findMany({
    include: {
      category: true,
      roadmap: {
        include: {
          milestones: true
        }
      }
    },
    orderBy: { title: 'asc' }
  })

  console.log('📊 Roadmap Summary:\n')
  let totalMilestones = 0

  courses.forEach(c => {
    const hasMilestones = c.roadmap?.milestones?.length || 0
    totalMilestones += hasMilestones
    const status = c.roadmap ? '✅' : '❌'
    console.log(`${status} ${c.title} (${c.category.name})`)
    if (c.roadmap) {
      console.log(`   └─ ${hasMilestones} milestones`)
    }
  })

  const withRoadmap = courses.filter(c => c.roadmap).length
  console.log(`\n📈 Total: ${withRoadmap}/${courses.length} courses with roadmaps`)
  console.log(`📍 Total milestones: ${totalMilestones}`)

  await prisma.$disconnect()
}

main().catch(console.error)
