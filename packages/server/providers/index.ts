import { container } from 'tsyringe'
import { IHashProvider } from './hashProvider/IHashProvider'
import { HashImplementation } from './hashProvider/implementations/hashProvider'
import { IJWTProvider } from './JWTProvider/models/IJWTProvider'
import { JWTProvider } from './JWTProvider/JWTProvider'

container.registerSingleton<IHashProvider>('HashProvider', HashImplementation)
container.registerSingleton<IJWTProvider>('JWTProvider', JWTProvider)
