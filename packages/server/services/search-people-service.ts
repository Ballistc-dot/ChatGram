import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../repositories/usersRepository/IUserRepository'
import { HashImplementation } from '../providers/hashProvider/implementations/hashProvider'
import { JWTProvider } from '../providers/JWTProvider/JWTProvider'

@injectable()
export class SearchPeopleService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: HashImplementation,
    @inject('JWTProvider')
    private jwtProvider: JWTProvider
  ) {}
  async execute(username: string) {
    console.log('here', username)
    const users = await this.usersRepository.findManyByUsername(username)

    return { users }
  }
}
