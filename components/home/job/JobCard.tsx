import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toIDRCurrency } from './../../../utils/numberFormatter'

interface IProps {
  id: string
  logo: string
  organization: string
  province: string
  city: string
  title: string
  type: string
  description: string
  salary: number
  salaryType: string
}

const JobCard = ({
  id,
  logo,
  organization,
  province,
  city,
  title,
  type,
  description,
  salary,
  salaryType
}: IProps) => {
  const [provinceDetail, setProvinceDetail] = useState('')
  const [cityDetail, setCityDetail] = useState('')

  const router = useRouter()

  useEffect(() =>{ 
    const getProvinceData = () => {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/provinsi/${province}`)
        .then(res => res.json())
        .then(res => setProvinceDetail(res.nama))
    }

    getProvinceData()
  }, [province])

  useEffect(() =>{ 
    const getCityData = () => {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota/${city}`)
        .then(res => res.json())
        .then(res => setCityDetail(res.nama))
    }

    getCityData()
  }, [city])

  return (
    <div onClick={() => router.push(`/job/${id}`)} className='hover:border-2 border hover:border-[#504ED7] border-gray-200 shadow-md p-5 hover:scale-105 rounded-md transition-[transform] cursor-pointer'>
      <div className='flex items-center gap-2'>
        <div className='w-12 h-12 rounded-full border border-gray-300 shrink-0'>
          <img src={logo} alt={organization} className='w-full h-full rounded-full object-cover' />
        </div>
        <div>
          <h1 className='font-medium'>{organization}</h1>
          <p className='mt-2 text-xs text-gray-500'>{provinceDetail}, {cityDetail}</p>
        </div>
      </div>
      <div className='mb-10 mt-6'>
        <h1 className='font-semibold text-xl'>{title}</h1>
        <p className='font-medium text-gray-500 text-sm mt-1'>
          {
            type === 'fullTime'
            ? 'Full Time'
            : type === 'partTime'
              ? 'Part Time'
              : type === 'freelance'
                ? 'Freelance'
                : 'Contractual'
          }
        </p>
        <div className='mt-3 text-gray-400 text-sm' dangerouslySetInnerHTML={{ __html: description.slice(0,30) + '...' }} />
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <p className='font-semibold text-xl'>{toIDRCurrency(salary)}</p>
          <sub className='text-xs text-gray-500 font-medium'>/{salaryType}</sub>
        </div>
      </div>
    </div>
  )
}

export default JobCard