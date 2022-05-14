import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import Footer from './../components/general/Footer'
import Navbar from './../components/general/Navbar'
import JobCard from './../components/jobs/JobCard'
import { RootStore } from '../utils/Interface'
import { getDataAPI } from '../utils/fetchData'
import { IJob } from '../redux/types/jobTypes'

interface IData {
  _id: string
  createdAt: string
  job: IJob
  jobseeker: string
  status: string
}

const JobApplied = () => {
  const [data, setData] = useState<IData[]>([])

  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() => {
    const fetchData = async() => {
      const res = await getDataAPI('jobs-applied', `${auth.accessToken}`)
      setData(res.data.jobs)
    }

    fetchData()
  }, [auth])

  return (
    <>
      <Head>
        <title>Job Seek | Job Applied</title>
      </Head>
      <Navbar />
      <div className='md:py-10 py-6 md:px-16 px-8'>
        <h1 className='text-xl font-medium'>Job Applied</h1>
        <div className='mt-6 grid lg:grid-cols-2 grid-cols-1 md:gap-10 gap-5'>
          {
            data.map(item => (
              <JobCard key={item._id} isApplied={true} item={item.job} status={item.status} appliedAt={item.createdAt} />
            ))
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default JobApplied