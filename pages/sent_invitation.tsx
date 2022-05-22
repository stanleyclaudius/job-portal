import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { IInvitation } from './../utils/Interface'
import { getDataAPI } from './../utils/fetchData'
import { RootState } from './../redux/store'
import Head from 'next/head'
import Footer from './../components/general/Footer'
import InvitationCard from './../components/general/InvitationCard'
import Loader from './../components/general/Loader'
import Navbar from './../components/general/Navbar'

const SentInvitation = () => {
  const [data, setData] = useState<IInvitation[]>([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { auth } = useSelector((state: RootState) => state)

  useEffect(() => {
    const fetchInvitation = async() => {
      setLoading(true)
      const res = await getDataAPI('invitation', `${auth.accessToken}`)
      setData(res.data.invitations)
      setLoading(false)
    }

    if (auth.user?.role === 'organization') {
      fetchInvitation()
    }
  }, [auth])

  useEffect(() => {
    if (!auth.accessToken) {
      router.push('/login?r=sent_invitation')
    } else {
      if (auth.user?.role !== 'organization') {
        router.push('/')
      }
    }
  }, [auth, router])
  
  return (
    <>
      <Head>
        <title>Job Seek | Sent Invitation</title>
      </Head>
      <Navbar />
      <div className='md:py-10 py-6 md:px-16 px-8'>
        <h1 className='text-xl font-medium'>Sent Invitation</h1>
        {
          loading
          ? <Loader size='xl' />
          : (
            <>
              {
                data.length === 0
                ? (
                  <div className='mt-6 bg-red-500 text-center text-white text-sm rounded-md py-3'>There's no sent invitation data found.</div>
                )
                : (
                  <div className='mt-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-8'>
                    {
                      data.map(item => (
                        <InvitationCard key={item._id} item={item} />
                      ))
                    }
                  </div>
                )
              }
            </>
          )
        }
      </div>
      <Footer />
    </>
  )
}

export default SentInvitation