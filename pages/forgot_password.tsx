import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { FormSubmit } from './../utils/Interface'
import { validateEmail } from './../utils/validator'
import { postDataAPI } from './../utils/fetchData'
import { RootState } from './../redux/store'
import Head from 'next/head'
import Footer from './../components/general/Footer'
import Navbar from './../components/general/Navbar'
import Loader from './../components/general/Loader'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
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

    if (!email) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide email address.' }
      })
    }

    if (!validateEmail(email)) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide valid email address.' }
      })
    }

    setLoading(true)
    try {
      const res = await postDataAPI('auth/forgot-password', { email })
      dispatch({
        type: 'alert/alert',
        payload: {
          success: res.data.msg
        }
      })
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

  return (
    <>
      <Head>
        <title>Job Seek | Forgot Password</title>
      </Head>
      <Navbar />
      <div className='bg-[#FAFAFA] px-10 py-14'>
        <div className='bg-white w-full max-w-[400px] border border-gray-300 m-auto px-6 py-12'>
          <h1 className='text-xl text-center mb-7 text-gray-600'>Forgot Password</h1>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='email' className='text-sm'>Email</label>
              <input type='text' id='email' name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='me@example.com' className='w-full outline-0 border border-gray-300 px-2 py-3 text-sm rounded-md mt-3' />
            </div>
            <button type='submit' className={`${loading ? 'bg-gray-200 hover:bg-gray-200 cursor-auto' : 'bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer'} outline-0 transition-[background] w-full text-white py-2 mt-6`}>
              {
                loading
                ? <Loader />
                : 'Submit'
              }
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ForgetPassword