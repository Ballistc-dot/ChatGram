import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../repositories/usersRepository/IUserRepository'
import { ISessionUserDto } from '../dtos/ISessionUserDto'
import { HashImplementation } from '../providers/hashProvider/implementations/hashProvider'
import { JWTProvider } from '../providers/JWTProvider/JWTProvider'

@injectable()
export class SessionUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: HashImplementation,
    @inject('JWTProvider')
    private jwtProvider: JWTProvider
  ) {}
  async execute(user: ISessionUserDto) {
    const userAlreadyExists = await this.usersRepository.findByEmail(user.email)

    if (!userAlreadyExists) {
      throw new Error('Invalid credentials')
    }

    const passwordsMatch = await this.hashProvider.compare(user.password, userAlreadyExists.password)
    if (!passwordsMatch) throw new Error('Invalid credentials')

    const access_token = await this.jwtProvider.sign(userAlreadyExists.id)

    return { access_token }
  }
}
