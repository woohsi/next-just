// const { PrismaClient }  = require('@prisma/client')
// const { hash } = require('bcrypt')
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prismax = new PrismaClient()

async function main() {
  const password = await hash('test', 12)
  const user = await prismax.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Test User',
      hashedPassword: password
    }
  })
  console.log({ user })
}
main()
  .then(() => prismax.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prismax.$disconnect()
    process.exit(1)
  })