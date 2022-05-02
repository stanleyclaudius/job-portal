import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Head from 'next/head'
import Link from "next/link"
import Navbar from './../components/general/Navbar'
import FacebookLogin, { FacebookLoginAuthResponse } from './../utils/FacebookLogin'
import GoogleLogin, { GoogleLoginResponse } from './../utils/GoogleLogin'
import Footer from '../components/general/Footer'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const onGoogleSuccess = (res: GoogleLoginResponse) => {
    const token = res.getAuthResponse().id_token
    console.log(token)
  }

  const onFacebookSuccess = (res: FacebookLoginAuthResponse) => {
    const { accessToken, userID } = res.authResponse
    console.log(accessToken, userID)
  }

  return (
    <>
      <Head>
        <title>Job Seek | Sign In</title>
      </Head>
      <Navbar />
      <div className='bg-[#FAFAFA] px-10 py-14'>
        <div className='bg-white w-full max-w-[400px] border border-gray-300 m-auto px-6 py-12'>
          <h1 className='text-xl text-center mb-7 text-gray-600'>Sign In to Job Seek</h1>
          <form>
            <div className='mb-7'>
              <label htmlFor='email' className='text-sm'>Email</label>
              <input type='text' id='email' name='email' placeholder='me@example.com' className='w-full outline-0 border border-gray-300 px-2 py-3 text-sm rounded-md mt-3' />
            </div>
            <div>
              <label htmlFor='password' className='text-sm'>Password</label>
              <div className='flex items-center border border-gray-300 mt-3 rounded-md px-2 py-3 gap-2'>
                <input type={showPassword ? 'text' : 'password'} id='password' name='password' className='w-full outline-0 text-sm' />
                {
                  showPassword
                  ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} className='text-gray-400 cursor-pointer' />
                  : <AiFillEye onClick={() => setShowPassword(true)} className='text-gray-400 cursor-pointer' />
                }
              </div>
              <Link href='/forget_password'>
                <a className='text-blue-500 text-xs mt-2 float-right outline-0'>Forgot password?</a>
              </Link>
              <div className='clear-both' />
            </div>
            <button className='outline-0 bg-[#504ED7] hover:bg-[#2825C2] transition-[background] w-full text-white py-2 mt-6'>SIGN IN</button>
          </form>
          <p className='text-center text-gray-400 my-7 text-sm'>Or Sign In With</p>
          <div className='flex justify-center items-center'>
            <div className='w-fit'>
              <GoogleLogin
                client_id={`${process.env.GOOGLE_CLIENT_ID}`}
                cookiepolicy='single_host_origin'
                onSuccess={onGoogleSuccess}
              />
            </div>
            <div className='ml-8 h-[52px]'>
              <FacebookLogin
                appId={`${process.env.FACEBOOK_APP_ID}`}
                onSuccess={onFacebookSuccess}
              />
            </div>
          </div>
          <p className='text-sm text-gray-500 text-center mt-8'>Don't have a Job Seek account yet? <Link href='/register'><a className='text-blue-500 outline-0'>Sign Up</a></Link></p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login