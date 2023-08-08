import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

interface User {
  name: string
}

const NUMBER_OF_USERS = 10

const generateUser = (): User => {
  const name = faker.person.fullName()
  return { name }
}

const createUsers = (countOfUsers: number): User[] => {
  const users: User[] = []
  for (let i = 0; i < countOfUsers; i++) {
    users.push(generateUser())
  }
  return users
}

const seed = async () => {
  try {
    const users = createUsers(NUMBER_OF_USERS)
    for (const user of users) {
      await prisma.user.create({ data: user })
    }
    console.log('Seed data completed!')
  } catch (error) {
    console.error(error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
