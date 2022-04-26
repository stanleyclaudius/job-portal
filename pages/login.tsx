import { BiLock } from 'react-icons/bi'
import { AiOutlineUser } from 'react-icons/ai'
import Head from 'next/head'
import Image from "next/image"
import Logo from './../public/images/logo.png'
import Link from "next/link"

const Login = () => {
  return (
    <>
      <Head>
        <title>Job Seek | Sign In</title>
      </Head>
      <div className='flex h-screen'>
        <div className='flex-1 py-10 px-12'>
          <div className='flex items-center'>
            <Image src={Logo} width={80} height={80} />
            <h1 className='text-2xl'>Job Seek</h1>
          </div>
          <h1 className='text-2xl my-8'>Sign In</h1>
          <form>
            <div className='flex items-center w-full border border-gray-300 rounded-md h-10 px-2 mb-7'>
              <AiOutlineUser className='text-lg text-gray-400' />
              <input type='text' placeholder='Email address' className='w-full px-3 outline-0 text-sm' />
            </div>
            <div className='mb-7'>
              <div className='flex items-center w-full border border-gray-300 rounded-md h-10 px-2 mb-2'>
                <BiLock className='text-lg text-gray-400' />
                <input type='password' placeholder='Password' className='w-full px-3 outline-0 text-sm' />
              </div>
              <Link href='/'>
                <a className='text-xs'>Forget password?</a>
              </Link>
            </div>
            <div className='flex items-center justify-between'>
              <button className='rounded-full px-6 py-2 bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-sm text-white outline-0'>
                Sign In
              </button>
              <Link href='/register'>
                <a className='text-sm'>Sign Up</a>
              </Link>
            </div>
          </form>
        </div>
        <div className='md:block hidden flex-[2] bg-cover' style={{ backgroundImage: "url('./images/auth.png')" }} />
      </div>
    </>
  )
}

export default Login