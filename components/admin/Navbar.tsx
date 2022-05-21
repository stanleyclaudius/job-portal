import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { BsPower } from 'react-icons/bs'
import { logout } from './../../redux/slices/authSlice'
import { AppDispatch, RootState } from './../../redux/store'

const Navbar = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { auth } = useSelector((state: RootState) => state)

  const handleLogout = () => {
    router.push('/login')
    dispatch(logout())
  }

  return (
    <div className='flex items-center justify-end gap-6 py-7 px-14'>
      <div className='flex items-center gap-5'>
        <div className='w-8 h-8 rounded-full outline-2 outline-offset-2 outline-gray-700 outline shrink-0'>
          <img src={auth.user?.avatar} alt={auth.user?.name} />
        </div>
        <p className='text-sm'>{auth.user?.name}</p>
      </div>
      <BsPower onClick={handleLogout} className='cursor-pointer text-xl' />
    </div>
  )
}

export default Navbar