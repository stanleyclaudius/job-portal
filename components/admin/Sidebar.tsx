import { useRouter } from 'next/router'
import { BsFillGrid1X2Fill } from 'react-icons/bs'
import { RiBuilding2Fill } from 'react-icons/ri'
import Link from 'next/link'
import { BiCategory } from 'react-icons/bi'

const Sidebar = () => {
  const { pathname } = useRouter()

  return (
    <div className='flex-1 border-r border-gray-400 flex flex-col gap-5 items-center py-7'>
      <Link href='/organization/approval'>
        <a className={`block hover:bg-[#E2E1FF] hover:text-[#504ED7] ${pathname === '/organization/approval' ? 'bg-[#E2E1FF] text-[#504ED7]' : 'text-gray-400'} transition-[background] w-fit p-3 rounded-md w-fit h-fit`}>
          <RiBuilding2Fill className='text-2xl' />
        </a>
      </Link>
      <Link href='/category'>
        <a className={`block hover:bg-[#E2E1FF] hover:text-[#504ED7] ${pathname === '/category' ? 'bg-[#E2E1FF] text-[#504ED7]' : 'text-gray-400'} transition-[background] w-fit p-3 rounded-md w-fit h-fit`}>
          <BiCategory className='text-2xl' />
        </a>
      </Link>
    </div>
  )
}

export default Sidebar