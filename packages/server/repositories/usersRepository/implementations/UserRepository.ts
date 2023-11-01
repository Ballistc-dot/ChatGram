import { User } from '@prisma/client'
import { ICreateUserDto } from '../../../dtos/ICreateUserDto'
import { prisma } from '../../../lib/prisma'
import { IUserRepository } from '../IUserRepository'

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    return (await prisma.user.findUnique({
      where: {
        email,
      },
    })) as User | undefined
  }
  async save(user: ICreateUserDto): Promise<User> {
    return await prisma.user.create({
      data: user,
    })
  }
  async findManyByUsername(username: string): Promise<User[] | undefined> {
    const user = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
    })
    const response = user.map((user) => {
      user.password = ''
      return user
    })

    return response
  }
  async findById(id: string): Promise<User | undefined> {
    return (await prisma.user.findUnique({
      where: {
        id,
      },
    })) as User | undefined
  }
}
