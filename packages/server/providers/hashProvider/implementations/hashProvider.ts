import { IHashProvider } from '../IHashProvider'
import bcrypt from 'bcrypt'

export class HashImplementation implements IHashProvider {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 6)
  }
  async compare(password: string, dbHashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, dbHashedPassword)
  }
}
