import { SendIcon } from '../components/SendIcon'
import socket from '../services/socket'
import { RootState } from '../store'
import { List, Smiley } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Search } from '../components/Search'
import { api } from '../services/axios'
import { SearchedContacts } from '../components/SearchedContacts'
type Test = {
  message: string
}

interface Contact {
  user: [
    {
      username: string
      id: string
    }
  ]
}

interface Chat {
  lastMessage: string
  user: {
    username: string
    id: string
  }
}

interface IMessage {
  message: string
  isMe: boolean
  user?: {
    username: string
    id: string
  }
}

interface ISocketMessageResponse {
  user: {
    id: string
    username: string
  }
  message: string
}
export default function Chat() {
  const {
    register,

    handleSubmit,
    reset,
  } = useForm<Test>()
  const [chatMessages, setChatMessages] = useState<IMessage[]>([])
  const [chats, setChats] = useState<Chat[]>([])
  const [searchedContacts, setSearchedContacts] = useState<Contact[]>([])

  useEffect(() => {
    async function connectSocket() {
      await socket.connect()
    }
    connectSocket()
  }, [])
  socket.on('message', (content: ISocketMessageResponse) => {
    if (activeChat.id !== content.user.id) {
      const newChat = chats.filter((chat) => {
        if (chat.user.id !== content.user.id) {
          return chat
        }
      })

      newChat.push({
        lastMessage: content.message,
        user: content.user,
      })
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setChats(newChat as Chat[])
    }

    if (activeChat.id === content.user.id) {
      setChatMessages([
        ...chatMessages,
        {
          isMe: false,
          message: content.message,
          user: content.user,
        },
      ])
    }
  })

  const activeChat = useSelector((state: RootState) => state.chat.activeChat)

  const onSubmit: SubmitHandler<Test> = async (data) => {
    if (data.message.length > 0) {
      await socket.emit('message', {
        message: data.message,
        userId: activeChat.id,
      })
      setChatMessages([
        ...chatMessages,
        {
          isMe: true,
          message: data.message,
        },
      ])

      reset({ message: '' })
    }
  }

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  //function handleOnPress() {}
  async function handleSearch(search: string) {
    const response = await api.get(`/people?username=${search}`)

    setSearchedContacts([
      {
        user: response.data.users,
      },
      ...searchedContacts,
    ])
  }

  function clearChats() {
    setSearchedContacts([])
    setChatMessages([])
  }

  return (
    <main className='flex min-h-screen flex-col justify-between md:px-24 md:py-10'>
      <div className=' p-4 flex min-h-[500px] flex-col md:flex-row'>
        <aside className='p-4 w-[364px] bg-white hidden md:flex md:flex-col '>
          <div className='flex-row flex gap-4 items-center '>
            <Search onSearch={handleSearch} clear={clearChats} />

            <List size={40} color='#707991' weight='bold' />
          </div>
          {
            <div className='mt-4'>
              {searchedContacts.length > 0
                ? searchedContacts.map((chat) => {
                    return chat.user.map((user) => (
                      <SearchedContacts
                        onPress={clearChats}
                        id={user.id}
                        message={`click to start chatting`}
                        username={user.username}
                        key={user.id}
                      />
                    ))
                  })
                : chats.map((chat) => (
                    <SearchedContacts
                      onPress={clearChats}
                      id={chat.user.id}
                      message={chat.lastMessage}
                      username={chat.user.username}
                      key={chat.user.id}
                    />
                  ))}
            </div>
          }
        </aside>
        <div className='bg-white w-full min-h-[580px] h flex flex-col'>
          <div className='flex flex-row items-center p-2 gap-4'>
            <div className='rounded-full bg-black w-[40px] h-[40px]'></div>
            <div>
              <h1 className='text-richBlack'>{activeChat && activeChat.username}</h1>
              <span className='text-navyGrey'>last seen 5 min ago</span>
            </div>
          </div>
          <div className=' bg-imagebg w-full h-full px-[50px] 2xl:px-[200px] flex flex-col justify-between'>
            {}
            <div className='mt-4 ml-4 flex flex-col gap-4  overflow-y-scroll max-h-[400px] scrollbar-hide '>
              {chatMessages &&
                chatMessages.map((msg) => {
                  if (msg.isMe) {
                    return (
                      <div key={Math.random()} className='bg-lightGreen max-w-[50%] ml-auto rounded-md px-2 py-1 flex'>
                        <span className='flex w-[100%] break-all	'>{msg.message}</span>
                      </div>
                    )
                  } else {
                    return (
                      <div key={Math.random()} className='bg-white max-w-[50%] mr-auto rounded-md px-2 py-1 flex'>
                        <span>{msg.message}</span>
                      </div>
                    )
                  }
                })}
              <div ref={messagesEndRef} />
            </div>
            <div className='w-full flex mb-4 flex-row'>
              <div className='w-full bg-white h-14 items-center flex p-2 px-4 rounded-xl justify-between'>
                <div className='flex flex-row items-center gap-2 w-full'>
                  <Smiley size={32} color='' />
                  <form className='flex flex-row justify-between w-full' onSubmit={handleSubmit(onSubmit)}>
                    <input className='w-[70%] bg-transparent h-14 outline-none ' {...register('message')} />
                    <button type='submit'>
                      <SendIcon />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
