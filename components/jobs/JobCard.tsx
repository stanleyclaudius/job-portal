import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { IJob } from './../../utils/Interface'
import moment from 'moment'

interface IProps {
  item?: IJob
  isApplied?: boolean
  status?: string
  appliedAt?: string
}

const JobCard = ({ item, isApplied, status, appliedAt }: IProps) => {
  const [province, setProvince] = useState('')

  const router = useRouter()

  const handleClick = () => {
    router.push(`/job/${item?._id}`)
  }

  useEffect(() =>{ 
    const getProvinceData = () => {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/provinsi/${item?.organization?.user.province}`)
        .then(res => res.json())
        .then(res => setProvince(res.nama))
    }

    getProvinceData()
  }, [item?.organization?.user.province])

  return (
    <div onClick={handleClick} className='bg-white rounded-md border border-gray-200 p-5 cursor-pointer'>
      <div className='flex items-center gap-3 mb-7'>
        <div className='w-16 h-16 rounded-full border border-gray-300 shrink-0'>
          <img src={item?.organization?.user.avatar} alt={item?.organization?.user.name} className='w-full h-full rounded-full object-cover' />
        </div>
        <div>
          <p className='text-[#504ED7] text-lg'>{item?.position}</p>
          <p className='mt-1 text-xs'>{item?.organization?.user.name}</p>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <p className='text-xs bg-green-200 text-green-700 px-3 py-1 rounded-full'>
          {
            item?.jobLevel === 'internship'
            ? 'Internship'
            : item?.jobLevel === 'entryLevel'
              ? 'Entry Level'
              : item?.jobLevel === 'associate'
                ? 'Associate'
                : item?.jobLevel === 'manager'
                  ? 'Manager'
                  : 'Director'
          }
        </p>
        <p className='text-xs bg-purple-200 text-purple-700 px-3 py-1 rounded-full'>
          {
            item?.employmentType === 'fullTime'
            ? 'Full Time'
            : item?.employmentType === 'partTime'
              ? 'Part Time'
              : item?.employmentType === 'freelance'
                ? 'Freelance'
                : 'Contractual'
          }
        </p>
      </div>
      <p className='mt-4 font-medium'>{province}</p>
      <div className='flex md:flex-row flex-col md:items-center md:justify-between'>
        {
          isApplied
          ? <p className='mt-2 text-gray-500 text-xs'>Applied At: {new Date(`${appliedAt}`).toLocaleString()}</p>
          : <p className='mt-2 text-gray-500 text-xs'>{moment(item?.createdAt).fromNow()}</p>
        }

        {
          isApplied &&
          <div className={`text-sm ${status === 'accepted' ? 'bg-green-600' : status === 'rejected' ? 'bg-red-500' : 'bg-orange-500'} capitalize w-fit text-white text-center py-2 px-4 rounded-md md:mt-0 mt-3`}>
            {status}
          </div>
        }
      </div>
    </div>
  )
}

export default JobCard