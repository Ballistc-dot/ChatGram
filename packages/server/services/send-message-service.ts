import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../repositories/usersRepository/IUserRepository'

@injectable()
export class SendMessageService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}
  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId)

    return user
  }
}
