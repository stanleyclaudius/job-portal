import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './../../redux/store'
import { getDataAPI } from './../../utils/fetchData'
import { IJobseeker, IInvitation } from './../../utils/Interface'

interface IProps {
  item: IInvitation
}

const InvitationCard = ({ item }: IProps) => {
  const [jobseeker, setJobseeker] = useState<Partial<IJobseeker>>({})
  
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootState) => state)

  useEffect(() => {
    const fetchJobseeker = async() => {
      const res = await getDataAPI(`jobseeker/${item.user}`, `${auth.accessToken}`)
      setJobseeker(res.data.jobseeker)
    }

    if (auth.accessToken) {
      fetchJobseeker()
    }
  }, [auth, item.user])

  return (
    <div className='shadow-md rounded-md p-5 border border-gray-200'>
      <div className='flex items-center gap-6 mb-5'>
        <div className='w-16 h-16 rounded-full border border-gray-300'>
          <img src={jobseeker.user?.avatar} alt={jobseeker.user?.name} className='w-full h-full rounded-full object-cover' />
        </div>
        <div>
          <h1>{jobseeker.user?.name}</h1>
          <p className='text-gray-500 text-sm mt-2'>{item.job.position}</p>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <button onClick={() => dispatch({ type: 'userDescription/open', payload: jobseeker })} className='bg-blue-400 hover:bg-blue-500 transition-[background] text-white rounded-md text-sm px-3 py-1'>Detail</button>
        <p className={`${item.status === 'on review' ? 'bg-orange-500' : item.status === 'accepted' ? 'bg-green-600' : 'bg-red-500'} text-white text-sm capitalize rounded-md px-3 py-1`}>{item.status}</p>
      </div>
    </div>
  )
}

export default InvitationCard