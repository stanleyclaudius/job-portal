import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdCheck } from 'react-icons/md'
import HireModal from '../modal/HireModal'
import UserDescriptionModal from "../modal/UserDescriptionModal"

interface IProps {
  isApplicant: boolean
}

const UserCard = ({ isApplicant }: IProps) => {
  const [openUserDescriptionModal, setOpenUserDescriptionModal] = useState(false)
  const [openHireModal, setOpenHireModal] = useState(false)

  return (
    <>
      <div className='bg-white rounded-md border border-gray-200 shadow-md p-5 cursor-pointer hover:scale-105 transition-[transform]'>
        <div className='flex items-center gap-5'>
          <div className='w-16 h-16 rounded-full bg-gray-300'></div>
          <div>
            <h1 className='font-medium text-lg'>Lorem Ipsum</h1>
            <p className='text-sm text-gray-500 mt-2'>Joined at: 17 Mar 2022</p>
          </div>
        </div>
        <div className='flex items-center gap-2 mt-5'>
          <p className='bg-gray-200 rounded-full px-3 py-1 text-xs w-fit truncate'>Frontend Engineer</p>
          <p className='bg-gray-200 rounded-full px-3 py-1 text-xs w-fit truncate'>IT</p>
          <p className='bg-gray-200 rounded-full px-3 py-1 text-xs w-fit truncate'>Programmer</p>
          <p className='bg-gray-200 rounded-full px-3 py-1 text-xs w-fit truncate'>Software Engineer</p>
        </div>
        <p className='mt-6 text-sm text-gray-700'>Based at: West Java</p>
        <div className='mt-3 flex items-center justify-between'>
          <button onClick={() => setOpenUserDescriptionModal(true)} className='bg-blue-500 hover:bg-blue-600 transition-[background] text-sm text-white rounded-md px-4 py-2'>Detail</button>
          {
            isApplicant
            ? (
              <div className='flex items-center gap-2'>
                <button className='bg-green-600 hover:bg-green-700 transition-[background] rounded-md text-white px-3 text-lg py-2'><MdCheck /></button>
                <button className='bg-red-500 hover:bg-red-600 transition-[background[ rounded-md text-white px-3 py-2 text-lg'><AiOutlineClose /></button>
              </div>
            )
            : <button onClick={() => setOpenHireModal(true)} className='bg-green-600 hover:bg-green-700 transition-[background] text-white rounded-md px-4 py-2 text-sm'>Hire</button>
          }
        </div>
      </div>

      <UserDescriptionModal
        openModal={openUserDescriptionModal}
        setOpenModal={setOpenUserDescriptionModal}
      />

      <HireModal
        openModal={openHireModal}
        setOpenModal={setOpenHireModal}
      />
    </>
  )
}

export default UserCard