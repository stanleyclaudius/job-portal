import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { FormSubmit, InputChange } from './../../utils/Interface'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { patchDataAPI } from './../../utils/fetchData'
import { RootState } from './../../redux/store'
import Head from 'next/head'
import Footer from './../../components/general/Footer'
import Navbar from './../../components/general/Navbar'
import Loader from './../../components/general/Loader'

const ResetPassword = () => {
  const [passwordData, setPasswordData] = useState({
    password: '',
    passwordConfirmation: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootState) => state)

  useEffect(() => {
    if (auth.accessToken) {
      router.push('/')
    }
  }, [auth, router])

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()
    if (!passwordData.password) {
      return dispatch({
        type: 'alert/alert',
        payload: {
          error: 'Please provide new password.'
        }
      })
    }

    if (passwordData.password.length < 8) {
      return dispatch({
        type: 'alert/alert',
        payload: {
          error: 'Password should be at least 8 characters.'
        }
      })
    }

    if (passwordData.password !== passwordData.passwordConfirmation) {
      return dispatch({
        type: 'alert/alert',
        payload: {
          error: 'Password confirmation should be matched.'
        }
      })
    }

    setLoading(true)
    try {
      const res = await patchDataAPI('auth/reset-password', { token: router.query.id, password: passwordData.password })
      dispatch({
        type: 'alert/alert',
        payload: {
          success: res.data.msg
        }
      })

      router.push('/login')
    } catch (err: any) {
      dispatch({
        type: 'alert/alert',
        payload: {
          error: err.response.data.msg
        }
      })
    }
    setLoading(false)
  }

  const handleChange = (e: InputChange) => {
    const { name, value } = e.target
    setPasswordData({ ...passwordData, [name]: value })
  }

  return (
    <>
      <Head>
        <title>Job Seek | Reset Password</title>
      </Head>
      <Navbar />
      <div className='bg-[#FAFAFA] px-10 py-14'>
        <div className='bg-white w-full max-w-[400px] border border-gray-300 m-auto px-6 py-12'>
          <h1 className='text-xl text-center mb-7 text-gray-600'>Reset Password</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-7'>
              <label htmlFor='password' className='text-sm'>Password</label>
              <div className='flex items-center border border-gray-300 mt-3 rounded-md px-2 py-3 gap-2'>
                <input type={showPassword ? 'text' : 'password'} id='password' name='password' value={passwordData.password} onChange={handleChange} className='w-full outline-0 text-sm' />
                {
                  showPassword
                  ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} className='text-gray-400 cursor-pointer' />
                  : <AiFillEye onClick={() => setShowPassword(true)} className='text-gray-400 cursor-pointer' />
                }
              </div>
            </div>
            <div className='mb-4'>
              <label htmlFor='passwordConfirmation' className='text-sm'>Password Confirmation</label>
              <div className='flex items-center border border-gray-300 mt-3 rounded-md px-2 py-3 gap-2'>
                <input type={showPasswordConfirmation ? 'text' : 'password'} id='passwordConfirmation' name='passwordConfirmation' value={passwordData.passwordConfirmation} onChange={handleChange} className='w-full outline-0 text-sm' />
                {
                  showPasswordConfirmation
                  ? <AiFillEyeInvisible onClick={() => setShowPasswordConfirmation(false)} className='text-gray-400 cursor-pointer' />
                  : <AiFillEye onClick={() => setShowPasswordConfirmation(true)} className='text-gray-400 cursor-pointer' />
                }
              </div>
            </div>
            <button type='submit' className={`${loading ? 'bg-gray-200 hover:bg-gray-200 cursor-auto' : 'bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer'} outline-0 transition-[background] w-full text-white py-2 mt-6`}>
              {
                loading
                ? <Loader />
                : 'Reset Password'
              }
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ResetPassword