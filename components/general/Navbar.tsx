import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import Image from 'next/image'
import Logo from './../../public/images/logo.png'
import { AiOutlineClose } from 'react-icons/ai'

const Navbar = () => {
  const { pathname } = useRouter()

  const router = useRouter()
  const [openSidebar, setOpenSidebar] = useState(false)

  const sidebarRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openSidebar && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setOpenSidebar(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openSidebar])
  
  return (
    <div className='flex items-center justify-between gap-10 lg:px-16 pl-4 pr-7 z-[999] py-3 bg-white sticky top-0 shadow-sm'>
      <div onClick={() => router.push('/')} className='flex items-center cursor-pointer'>
        <Image src={Logo} width={60} height={60} />
        <h1 className='text-xl'>Job Seek</h1>
      </div>
      <div onClick={() => setOpenSidebar(true)} className='lg:hidden block'>
        <GiHamburgerMenu className='text-xl cursor-pointer' />
      </div>
      <div ref={sidebarRef} className={`lg:static fixed top-0 ${openSidebar ? 'right-0' : '-right-[3000px]'} transition-all bottom-0 lg:shadow-none shadow-xl lg:w-auto w-[200px] lg:p-0 p-7 bg-white lg:flex lg:flex-1`}>
        <AiOutlineClose onClick={() => setOpenSidebar(false)} className='float-right text-xl mb-5 lg:hidden cursor-pointer' />
        <div className='clear-both' />
        <div className='flex-1 lg:flex-row flex-col flex lg:items-center items-start text-sm lg:gap-7 gap-4'>
          <Link href='/'>
            <a className={`navbar-link ${pathname === '/' || pathname === '/index' ? 'active' : undefined}`}>Home</a>
          </Link>
          <Link href='/jobs'>
            <a className={`navbar-link ${pathname === '/jobs' ? 'active' : undefined}`}>Find Jobs</a>
          </Link>
          <Link href='/find_candidate'>
            <a className={`navbar-link ${pathname === '/find_candidate' ? 'active' : undefined}`}>Find Candidates</a>
          </Link>
          <Link href='/'>
            <a className='navbar-link'>Career Advice</a>
          </Link>
        </div>
        <div className='text-sm flex lg:flex-row flex-col lg:items-center items-start lg:gap-8 gap-4 mt-10 lg:mt-0'>
          <Link href='/login'>
            <a className={`navbar-link ${pathname === '/login' ? 'active' : undefined}`}>
              Login
            </a>
          </Link>
          <Link href='/register'>
            <a className={`px-6 py-2 border-2 rounded-full border-[#504ED7] ${pathname === '/register' || pathname === '/register/jobseeker' || pathname === '/register/organization' ? 'bg-[#504ED7] text-white' : 'text-[#504ED7]'}`}>
              Register Now
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar