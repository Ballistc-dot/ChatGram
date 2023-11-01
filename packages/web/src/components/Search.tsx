import { MagnifyingGlass } from '@phosphor-icons/react'
import { useForm, SubmitHandler } from 'react-hook-form'
type Inputs = {
  search: string
}

interface ISearch {
  onSearch(string: string): void
  clear(): void
}

export function Search({ onSearch, clear }: ISearch) {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    onSearch(data.search)
    reset()
    clear()
  }

  return (
    <div className='w-[276px] h-[40px] flex flex-row bg-lightGrey px-4 py-1 gap-3 rounded-[22px] items-center'>
      <MagnifyingGlass size={24} color='#707991' />
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <input className=' bg-transparent w-[80%] placeholder:text-navyGrey' {...register('search')} placeholder='Search' />
      </form>
    </div>
  )
}
