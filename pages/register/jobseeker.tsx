import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai'
import { BiLock } from 'react-icons/bi'
import { validateEmail } from './../../utils/validator'
import { register } from './../../utils/auth'
import { FormSubmit, InputChange } from './../../utils/Interface'
import { AppDispatch, RootState } from './../../redux/store'
import Link from 'next/link'
import Head from 'next/head'
import Footer from './../../components/general/Footer'
import Navbar from './../../components/general/Navbar'
import Loader from './../../components/general/Loader'

const Jobseeker = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { alert, auth } = useSelector((state: RootState) => state)

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()
    
    if (!userData.name) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide name to register.' }
      })
    }

    if (!userData.email) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide email to register.' }
      })
    }

    if (!validateEmail(userData.email)) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide valid email address.' }
      })
    }

    if (!userData.password) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide password to register.' }
      })
    }

    if (userData.password.length < 8) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Password should be at least 8 characters.' }
      })
    }

    if (!userData.passwordConfirmation) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide password confirmation to register.' }
      })
    }

    if (userData.password !== userData.passwordConfirmation) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Password confirmation should be matched.' }
      })
    }

    register({ ...userData, role: 'jobseeker' }, [], dispatch)
  }

  useEffect(() => {
    if (auth.accessToken) {
      router.push('/')
    }
  }, [router, auth.accessToken])

  return (
    <>
      <Head>
        <title>Job Seek | Jobseeker Register</title>
      </Head>
      <Navbar />
      <div className='bg-[#FAFAFA] px-10 py-14'>
        <div className='bg-white w-full max-w-[600px] border border-gray-300 m-auto px-8 py-12'>
          <h1 className='text-xl text-center mb-7 text-gray-600'>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div className='flex items-center gap-3 border border-gray-300 rounded-md h-12 px-3 mb-7'>
              <AiOutlineUser className='text-lg text-gray-500' />
              <input type='text' name='name' value={userData.name} onChange={handleChange} placeholder='Name' className='outline-0 w-full text-sm' />
            </div>
            <div className='flex items-center gap-3 border border-gray-300 rounded-md h-12 px-3 mb-7'>
              <AiOutlineUser className='text-lg text-gray-500' />
              <input type='text' name='email' value={userData.email} onChange={handleChange} placeholder='Email address' className='outline-0 w-full text-sm' />
            </div>
            <div className='flex items-center gap-3 border border-gray-300 rounded-md h-12 px-3 mb-7'>
              <BiLock className='text-lg text-gray-500' />
              <div className='flex items-center w-full'>
                <input type={showPassword ? 'text' : 'password'} name='password' value={userData.password} onChange={handleChange} placeholder='Password' className='outline-0 w-full text-sm pr-3' />
                {
                  showPassword
                  ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} className='cursor-pointer text-gray-500' />
                  : <AiFillEye onClick={() => setShowPassword(true)} className='cursor-pointer text-gray-500' />
                }
              </div>
            </div>
            <div className='flex items-center gap-3 border border-gray-300 rounded-md h-12 px-3'>
              <BiLock className='text-lg text-gray-500' />
              <div className='flex items-center w-full'>
                <input type={showPasswordConfirmation ? 'text' : 'password'} name='passwordConfirmation' value={userData.passwordConfirmation} onChange={handleChange} placeholder='Password confirmation' className='outline-0 w-full text-sm pr-3' />
                {
                  showPasswordConfirmation
                  ? <AiFillEyeInvisible onClick={() => setShowPasswordConfirmation(false)} className='cursor-pointer text-gray-500' />
                  : <AiFillEye onClick={() => setShowPasswordConfirmation(true)} className='cursor-pointer text-gray-500' />
                }
              </div>
            </div>
            <button className={`${alert.loading ? 'bg-gray-200 hover:bg-gray-200 cursor-auto' : 'bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer'} transition-[background] text-sm w-full py-3 text-white rounded-sm mt-7`}>
              {
                alert.loading
                ? <Loader />
                : 'SIGN UP'
              }
            </button>
          </form>
          <p className='mt-8 text-gray-400 text-sm text-center'>Already have an account? <Link href='/login'><a className='outline-0 text-blue-500'>Sign in</a></Link></p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Jobseeker