import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Updating admin names...')

  const admins = await prisma.admin.findMany()

  for (const admin of admins) {
    if (admin.fullName === 'John Doe' || !admin.fullName) {
      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          fullName: admin.username,
        },
      })
      console.log(`✅ Updated ${admin.username}'s fullName`)
    }
  }

  console.log('Done!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
