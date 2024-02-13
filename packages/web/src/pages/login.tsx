import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { signInWithEmailAndPassword } from '../store/auth/thunks'
type Inputs = {
  email: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const dispatch = useDispatch<AppDispatch>()
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    await dispatch(signInWithEmailAndPassword(data))
  }

  return (
    <div className='flex min-h-screen flex-col justify-center md:px-24 md:py-10 items-center'>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <span>Email</span>
        <input className='bg-lightGrey border border-gray-900 p-2 rounded-md' {...register('email', { required: true })} />

        <span>Password</span>
        <input type='password' className='bg-lightGrey border border-gray-900 p-2 rounded-md' {...register('password', { required: true })} />

        {errors.password && <span className='text-red'>This field is required</span>}

        <input className='cursor-pointer bg-richBlack text-white mt-4 rounded-md h-10 ' type='submit' value='Send' />
      </form>
    </div>
  )
}
