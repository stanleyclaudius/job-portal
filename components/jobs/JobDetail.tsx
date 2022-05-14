import { useEffect, useState } from 'react'
import { BsBookmark } from 'react-icons/bs'
import { IJob } from './../../redux/types/jobTypes'
import { numberFormatter } from './../../utils/numberFormatter'

interface IProps {
  job?: IJob
}

const JobDetail = ({ job }: IProps) => {
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [district, setDistrict] = useState('')

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
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-5'>
          <div className='w-16 h-16 rounded-md bg-gray-200 shrink-0'>
            <img src={job?.organization?.user.avatar} alt={job?.organization?.user.name} className='w-full h-full rounded-md' />
          </div>
          <div>
            <h1 className='text-[#504ED7] text-lg'>{job?.position}</h1>
            <p className='text-xs mt-2'>{job?.organization?.user.name}</p>
          </div>
        </div>
        <div className='flex items-center gap-7'>
          <BsBookmark className='cursor-pointer text-xl' />
          <button className='bg-[#504ED7] hover:bg-[#2825C2] outline-0 transition-[background] text-white rounded-md text-sm px-4 py-2'>Apply</button>
        </div>
      </div>
      <div className='mt-5'>
        <p className='font-medium mb-4'>Job Overview</p>
        <div className='text-sm leading-relaxed mb-3' dangerouslySetInnerHTML={{ __html: `${job?.overview}` }} />
        <p className='font-medium mb-4 mt-6'>Skills and Expertise</p>
        <div className='flex items-center gap-3 mb-7'>
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
          <p className='font-semibold text-lg'>{numberFormatter(job?.salary!)}</p>
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
  )
}

export default JobDetail