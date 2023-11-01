import { container } from 'tsyringe'
import { IUserRepository } from './usersRepository/IUserRepository'
import { UserRepository } from './usersRepository/implementations/UserRepository'

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository)
