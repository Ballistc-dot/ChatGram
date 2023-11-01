import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../repositories/usersRepository/IUserRepository'
import { ICreateUserDto } from '../dtos/ICreateUserDto'
import { HashImplementation } from '../providers/hashProvider/implementations/hashProvider'
import { JWTProvider } from '../providers/JWTProvider/JWTProvider'

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: HashImplementation,
    @inject('JWTProvider')
    private jwtProvider: JWTProvider
  ) {}
  async execute(user: ICreateUserDto) {
    const userAlreadyExists = await this.usersRepository.findByEmail(user.email)

    if (userAlreadyExists) {
      throw new Error('User Already Exists!')
    }

    user.password = await this.hashProvider.hash(user.password)

    const { id } = await this.usersRepository.save(user)

    const access_token = await this.jwtProvider.sign(id)
    return { access_token }
  }
}
