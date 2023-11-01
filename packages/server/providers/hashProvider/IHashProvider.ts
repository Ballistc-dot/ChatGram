export interface IHashProvider {
  hash(password: string): Promise<string>
  compare(password: string, dbHashedPassword: string): Promise<boolean>
}
