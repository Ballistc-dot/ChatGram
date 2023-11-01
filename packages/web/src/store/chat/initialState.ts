import { IChatState } from './interfaces/IChatState'

export const chatInitialState: IChatState = {
  activeChat: {
    id: '',
    username: '',
  },
  chats: [
    {
      user: {
        username: '',
        id: '',
      },
      lastMessage: '',
    },
  ],
}
