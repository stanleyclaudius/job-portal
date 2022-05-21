import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { FormSubmit, IJobseeker } from './../utils/Interface'
import { getJobPosition } from './../redux/slices/jobSlice'
import { AppDispatch, RootState } from './../redux/store'
import axios from 'axios'
import Head from 'next/head'
import Footer from './../components/general/Footer'
import Navbar from './../components/general/Navbar'
import UserCard from './../components/general/UserCard'

interface IProps {
  data: IJobseeker[]
}

const Candidates = ({ data }: IProps) => {
  const [keyword, setKeyword] = useState('')

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { auth } = useSelector((state: RootState) => state)

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    router.push(`/candidates?q=${keyword}`)
  }

  useEffect(() => {
    if (!auth.accessToken) {
      router.push('/login?r=candidates')
    } else {
      if (auth.user?.role !== 'organization' && auth.user?.role !== 'admin') {
        router.push('/')
      }
    }
  }, [router, auth])

  useEffect(() => {
    if (auth.user?.role === 'organization') {
      dispatch(getJobPosition(`${auth.accessToken}`))
    }
  }, [dispatch, auth])

  return (
    <>
      <Head>
        <title>Job Seek | Candidates</title>
      </Head>
      <Navbar />
      <div className='md:py-10 py-7 md:px-16 px-5'>
        <form onSubmit={handleSubmit} className='flex shadow-xl w-full border border-gray-200 rounded-full h-14 items-center justify-between px-4'>
          <input type='text' value={keyword} onChange={e => setKeyword(e.target.value)} placeholder='Job title or keyword' className='w-full outline-0 px-3 rounded-full text-sm' />
          <button className='outline-0 bg-[#504ED7] hover:bg-[#2825C2] transition-[background] px-5 py-2 text-white text-sm rounded-full'>Search</button>
        </form>
      </div>
      <div className='bg-gray-100 pt-10 pb-7 md:px-16 px-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
        {
          data.length === 0
          ? (
            <div className='bg-red-500 text-white text-center rounded-md py-3'>There's no candidate data found.</div>
          )
          : (
            <>
              {
                data.map(item => (
                  <UserCard key={item._id} info={item} isApplicant={false} />
                ))
              }
            </>
          )
        }
      </div>
      <Footer />
    </>
  )
}

export default Candidates

export const getServerSideProps: GetServerSideProps = async(context) => {
  let url = `${process.env.CLIENT_URL}/api/jobseeker`

  const search = context.query.q
  if (search) {
    url += `?q=${search}`
  }

  const res = await axios.get(url)

  return {
    props: {
      data: res.data.jobseekers
    }
  }
}