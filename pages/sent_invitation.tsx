import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from "../components/general/Footer"
import InvitationCard from "../components/general/InvitationCard"
import Navbar from "../components/general/Navbar"
import { IInvitation } from "../redux/types/invitationTypes"
import { getDataAPI } from "../utils/fetchData"
import { RootStore } from "../utils/Interface"

const SentInvitation = () => {
  const [data, setData] = useState<IInvitation[]>([])

  const router = useRouter()
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() => {
    const fetchInvitation = async() => {
      const res = await getDataAPI('invitation', `${auth.accessToken}`)
      setData(res.data.invitations)
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
        <div className='mt-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-8'>
          {
            data.map(item => (
              <InvitationCard key={item._id} item={item} />
            ))
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SentInvitation