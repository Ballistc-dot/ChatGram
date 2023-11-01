import { updateActiveChat } from '../store/chat/slice'
import { useDispatch } from 'react-redux'

interface IChat {
  username: string
  id: string
  message: string
  onPress(): void
}

export function SearchedContacts({ username, id, message, onPress }: IChat) {
  const dispach = useDispatch()
  function handleChatClick() {
    dispach(
      updateActiveChat({
        activeChat: {
          id,
          username,
        },
      })
    )
    onPress()
  }

  return (
    <div className='h-[72px] flex flex-row gap-4 w-full cursor-pointer' onClick={handleChatClick}>
      <div className='rounded-full bg-black w-[48px] h-[48px]'></div>
      <div className='w-[80%] flex flex-col'>
        <div className='flex flex-row justify-between'>
          <h2 className='text-richBlack'>{username}</h2>
          <h3 className='text-navyGrey'>19:38</h3>
        </div>
        <div className='w-full flex items-center justify-between'>
          <span className='text-navyGrey text-sm'>{message}</span>

          <span className='rounded-full  w-3  items-center flex justify-center p-2 h-3 bg-lightGreen text-xs text-white'>1</span>
        </div>
      </div>
    </div>
  )
}
