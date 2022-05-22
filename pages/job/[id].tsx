import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IJob } from './../../utils/Interface'
import { toIDRCurrency } from './../../utils/numberFormatter'
import { getDataAPI, postDataAPI } from './../../utils/fetchData'
import { RootState } from './../../redux/store'
import axios from 'axios'
import Head from 'next/head'
import Footer from './../../components/general/Footer'
import Navbar from './../../components/general/Navbar'
import RecheckCVModal from './../../components/modal/RecheckCVModal'

interface IProps {
  job: IJob
}

const JobDetail = ({ job }: IProps) => {
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [isApplied, setIsApplied] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootState) => state)

  const applyJob = async() => {
    if (!auth.accessToken) {
      return dispatch({
        type: 'alert/alert',
        payload: {
          error: 'Please login first to apply job.'
        }
      })
    }

    setOpenModal(true)
  }

  const handleApplyJob = async() => {
    try {
      const res = await postDataAPI('job/apply', { job: job?._id, userId: auth.user?._id }, `${auth.accessToken}`)
      dispatch({
        type: 'alert/alert',
        payload: { success: res.data.msg }
      })

      setIsApplied(true)
    } catch (err: any) {
      dispatch({
        type: 'alert/alert',
        payload: { error: err.response.data.msg }
      })
    }

    setOpenModal(false)
  }

  useEffect(() => {
    const fetchAppliedStatus = async() => {
      const res = await getDataAPI(`jobs-applied/status/${job._id}`, auth.accessToken)
      setIsApplied(res.data.isApplied)
    }

    if (auth.accessToken && auth.user?.role === 'jobseeker') {
      fetchAppliedStatus()
    }
  }, [auth, job._id])

  useEffect(() =>{ 
    const getProvinceData = () => {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/provinsi/${job?.organization?.user.province}`)
        .then(res => res.json())
        .then(res => setProvince(res.nama))
    }

    getProvinceData()
  }, [job?.organization?.user.province])

  useEffect(() =>{ 
    const getCityData = () => {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota/${job?.organization?.user.city}`)
        .then(res => res.json())
        .then(res => setCity(res.nama))
    }

    getCityData()
  }, [job?.organization?.user.city])

  useEffect(() =>{ 
    const getDistrictData = () => {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan/${job?.organization?.user.district}`)
        .then(res => res.json())
        .then(res => setDistrict(res.nama))
    }

    getDistrictData()
  }, [job?.organization?.user.district])

  return (
    <>
      <Head>
        <title>Job Seek | {job.position} at {job.organization?.user.name}</title>
      </Head>
      <Navbar />
      <div className='md:px-52 px-6 py-10'>
        <> 
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-5'>
              <div className='w-16 h-16 rounded-full border border-gray-300 shrink-0'>
                <img src={job?.organization?.user.avatar} alt={job?.organization?.user.name} className='w-full h-full rounded-full object-cover' />
              </div>
              <div>
                <h1 className='text-[#504ED7] text-lg'>{job?.position}</h1>
                <p className='text-xs mt-2'>{job?.organization?.user.name}</p>
              </div>
            </div>
            {
              isApplied
              ? (
                <p className='bg-green-600 text-white rounded-md text-sm px-4 py-2'>
                  Application Sent
                </p>
              )
              : (
                <>
                  {
                    auth.user?.role === 'jobseeker' &&
                    <button onClick={applyJob} className='bg-[#504ED7] hover:bg-[#2825C2] outline-0 transition-[background] text-white rounded-md text-sm px-4 py-2'>Apply</button>
                  }
                </>
              )
            }
          </div>
          <div className='mt-5'>
            <p className='font-medium mb-4'>Job Overview</p>
            <div className='text-sm leading-relaxed mb-3 break-words' dangerouslySetInnerHTML={{ __html: `${job?.overview}` }} />
            <p className='font-medium mb-4 mt-6'>Skills and Expertise</p>
            <div className='flex items-center gap-3 mb-7 flex-wrap'>
              {
                job?.skills.map(item => (
                  <p key={item} className='bg-gray-200 text-gray-600 text-xs px-3 py-2 rounded-full'>{item}</p>
                ))
              }
            </div>
            <p className='font-medium mb-4'>Requirements</p>
            <div className='mb-7 list-disc ml-5' dangerouslySetInnerHTML={{ __html: `${job?.requirements}`}} />
            <p className='font-medium mb-4'>Salary</p>
            <div className='flex items-center mb-7'>
              <p className='font-semibold text-lg'>{toIDRCurrency(job?.salary!)}</p>
              <p className='text-gray-500 text-xs'>/month</p>
            </div>
            <p className='font-medium mb-4'>Company Overview</p>
            <div className='text-sm leading-relaxed mb-3' dangerouslySetInnerHTML={{ __html: `${job?.organization?.description}` }} />
            <p className='font-medium mb-4 mt-6'>Company Location</p>
            <p className='mb-3 text-sm leading-realxed'>{province}, {city}, {district}, {job?.organization?.user.postalCode}</p>
            <p className='mb-7 text-sm leading-realxed'>{job?.organization?.address}</p>
            <p className='font-medium mb-4'>Estimated Company Total Employee</p>
            <p>{job?.organization?.totalEmployee} people</p>
          </div>
        </>
      </div>
      <Footer />

      <RecheckCVModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        company={job.organization?.user.name as string}
        position={job.position}
        onClick={handleApplyJob}
      />
    </>
  )
}

export default JobDetail

export const getServerSideProps: GetServerSideProps = async(context) => {
  try {
    const res = await axios.get(`${process.env.CLIENT_URL}/api/job/${context.query.id}`)

    return {
      props: {
        job: res.data.job[0]
      }
    }
  } catch (err: any) {
    return {
      redirect: {
        destination: '/jobs',
        permanent: false
      }
    }
  }
}