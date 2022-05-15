import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { MdCheck } from 'react-icons/md'
import { IApplicant } from '../../redux/types/applicantTypes'
import HireModal from './../modal/HireModal'
import { RootStore } from '../../utils/Interface'
import { changeApplicantStatus } from '../../redux/actions/applicantActions'
import { OPEN_DESCRIPTION_MODAL } from '../../redux/types/userDescriptionTypes'

interface IProps {
  isApplicant: boolean
  item?: IApplicant
}

const UserCard = ({ isApplicant, item }: IProps) => {
  const [openHireModal, setOpenHireModal] = useState(false)
  const [province, setProvince] = useState('')

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() =>{ 
    const getProvinceData = () => {
      fetch(`https://dev.farizdotid.com/api/daerahindonesia/provinsi/${item?.jobseeker.user.province}`)
        .then(res => res.json())
        .then(res => setProvince(res.nama))
    }
    
    if (item?.jobseeker.user.province) {
      getProvinceData()
    }

    return () => setProvince('Not provided.')
  }, [item?.jobseeker.user.province])

  return (
    <>
      <div className='bg-white rounded-md border border-gray-200 shadow-md p-5 cursor-pointer hover:scale-105 transition-[transform]'>
        <div className='flex items-center gap-5'>
          <div className='w-16 h-16 rounded-full bg-gray-300 shrink-0 shadow-xl border border-gray-300'>
            <img src={item?.jobseeker.user.avatar} alt={item?.jobseeker.user.name} className='w-full h-full rounded-full' />
          </div>
          <div>
            <h1 className='font-medium text-lg'>{item?.jobseeker.user.name}</h1>
            <p className='text-sm text-gray-500 mt-2'>Joined at: {new Date(`${item?.jobseeker.user.createdAt}`).toLocaleDateString()}</p>
          </div>
        </div>
        <div className='flex items-center gap-2 mt-5'>
          {
            item?.jobseeker.skills.map(item => (
              <p key={item} className='bg-gray-200 rounded-full px-3 py-1 text-xs w-fit truncate'>{item}</p>
            ))
          }
        </div>
        <p className='mt-6 text-sm text-gray-700'>Based at: {province}</p>
        <div className='mt-3 flex items-center justify-between'>
          <button onClick={() => dispatch({ type: OPEN_DESCRIPTION_MODAL, payload: item?.jobseeker })} className='bg-blue-500 hover:bg-blue-600 transition-[background] text-sm text-white rounded-md px-4 py-2'>Detail</button>
          {
            isApplicant
            ? (
              <>
                {
                  item?.status !== 'accepted' && item?.status !== 'rejected'
                  ? (
                    <div className='flex items-center gap-2'>
                      <button onClick={() => dispatch(changeApplicantStatus(`${item?.job}`, `${item?.jobseeker._id}`, 'accepted', `${auth.accessToken}`))} className='bg-green-600 hover:bg-green-700 transition-[background] rounded-md text-white px-3 text-lg py-2'><MdCheck /></button>
                      <button onClick={() => dispatch(changeApplicantStatus(`${item?.job}`, `${item?.jobseeker._id}`, 'rejected', `${auth.accessToken}`))} className='bg-red-500 hover:bg-red-600 transition-[background] rounded-md text-white px-3 py-2 text-lg'><AiOutlineClose /></button>
                    </div>
                  )
                  : (
                    <div className={`${item?.status === 'accepted' ? 'bg-green-600' : 'bg-red-500'} rounded-md capitalize text-white px-3 py-2 `}>{item?.status}</div>
                  )
                }
              </>
            )
            : <button onClick={() => setOpenHireModal(true)} className='bg-green-600 hover:bg-green-700 transition-[background] text-white rounded-md px-4 py-2 text-sm'>Hire</button>
          }
        </div>
      </div>

      <HireModal
        openModal={openHireModal}
        setOpenModal={setOpenHireModal}
      />
    </>
  )
}

export default UserCard