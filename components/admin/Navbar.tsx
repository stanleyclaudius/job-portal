import { AiFillBell } from 'react-icons/ai'
import { BsPower } from 'react-icons/bs'

const Navbar = () => {
  return (
    <div className='flex items-center justify-end gap-6 py-7 px-14'>
      <div className='flex items-center gap-5'>
        <div className='w-8 h-8 rounded-full outline-2 outline-offset-2 outline-gray-700 outline'></div>
        <p className='text-sm'>loremipsum@gmail.com</p>
      </div>
      <AiFillBell className='cursor-pointer text-xl' />
      <BsPower className='cursor-pointer text-xl' />
    </div>
  )
}

export default Navbar