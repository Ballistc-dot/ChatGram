export interface IChatState {
  activeChat: {
    username: string
    id: string
    //messages: [string]
  }
  chats: Array<{
    user: {
      username: string
      id: string
    }
    lastMessage: string
  }>
}
