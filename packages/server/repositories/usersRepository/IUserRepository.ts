import { User } from '@prisma/client'
import { ICreateUserDto } from '../../dtos/ICreateUserDto'

export interface IUserRepository {
  save(user: ICreateUserDto): Promise<User>
  findByEmail(email: string): Promise<User | undefined>
  findManyByUsername(username: string): Promise<User[] | undefined>
  findById(id: string): Promise<User | undefined>
}
