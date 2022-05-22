import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { MdCheck } from 'react-icons/md'
import { IInvitation } from './../../utils/Interface'
import { changeInvitationStatus } from './../../redux/slices/invitationSlice'
import { AppDispatch, RootState } from './../../redux/store'
import JobDetailModal from './../modal/JobDetailModal'

interface IProps {
  data: IInvitation
}

const OrganizationCard = ({ data }: IProps) => {
  const [openJobDetailModal, setOpenJobDetailModal] = useState(false)

  const dispatch = useDispatch<AppDispatch>()
  const { auth } = useSelector((state: RootState) => state)

  return (
    <>
      <div className='bg-white rounded-md border border-gray-200 shadow-md p-5'>
        <div className='flex items-center gap-4'>
          <div className='w-16 h-16 rounded-full border border-gray-300 shrink-0'>
            <img src={data.job.organization?.user.avatar} alt={data.job.organization?.user.name} className='w-full h-full rounded-full object-cover' />
          </div>
          <div>
            <h1 className='text-lg font-medium'>{data.job.organization?.user.name}</h1>
            <p className='text-sm text-gray-700 mt-2'>{data.job.position}</p>
          </div>
        </div>
        <div className='mt-6'>
          <p className='text-sm bg-gray-200 w-fit rounded-full px-4 py-1 text-gray-600 truncate'>{data.job.organization?.industryType} Industry</p>
        </div>
        <div className='mt-6 flex items-center gap-3'>
          <FaUsers className='text-xl text-gray-600' />
          <p className='text-sm'>&plusmn; {data.job.organization?.totalEmployee} employees</p>
        </div>
        <div className='flex items-center justify-between mt-5'>
          <button onClick={() => setOpenJobDetailModal(true)} className='bg-blue-500 hover:bg-blue-600 transition-[background] rounded-md text-white px-4 py-2 text-sm'>Detail</button>
          {
            data.status === 'on review'
            ? (
              <div className='flex items-center gap-2'>
                <button onClick={() => dispatch(changeInvitationStatus({ id: `${data._id}`, status: 'accepted', token: `${auth.accessToken}` }))} className='bg-green-600 hover:bg-green-700 transition-[background] rounded-md text-white px-3 text-lg py-2'><MdCheck /></button>
                <button onClick={() => dispatch(changeInvitationStatus({ id: `${data._id}`, status: 'rejected', token: `${auth.accessToken}` }))} className='bg-red-500 hover:bg-red-600 transition-[background] rounded-md text-white px-3 py-2 text-lg'><AiOutlineClose /></button>
              </div>
            )
            : <p className={`${data.status === 'accepted' ? 'bg-green-600' : 'bg-red-500'} rounded-md capitalize text-sm text-white px-3 py-2`}>{data.status}</p>
          }
        </div>
      </div>

      <JobDetailModal
        openModal={openJobDetailModal}
        setOpenModal={setOpenJobDetailModal}
        invitationData={data}
      />
    </>
  )
}

export default OrganizationCard