import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { MdCheck } from 'react-icons/md'
import JobDetailModal from './../modal/JobDetailModal'

const OrganizationCard = () => {
  const [openJobDetailModal, setOpenJobDetailModal] = useState(false)

  return (
    <>
      <div className='bg-white rounded-md border border-gray-200 shadow-md p-5'>
        <div className='flex items-center gap-4'>
          <div className='w-16 h-16 rounded-full bg-gray-300 shrink-0'></div>
          <div>
            <h1 className='text-lg font-medium'>PT. Lorem Ipsum</h1>
            <p className='text-sm text-gray-700 mt-2'>Recruiting Manager</p>
          </div>
        </div>
        <div className='flex items-center gap-3 mt-6'>
          <p className='text-sm bg-gray-200 w-fit rounded-full px-4 py-1 text-gray-600 truncate'>F&B Industry</p>
          <p className='text-sm bg-gray-200 w-fit rounded-full px-4 py-1 text-gray-600 truncate'>Medium ENterprise</p>
        </div>
        <div className='mt-6 flex items-center gap-3'>
          <FaUsers className='text-xl text-gray-600' />
          <p className='text-sm'>&plusmn; 250 employees</p>
        </div>
        <div className='flex items-center justify-between mt-5'>
          <button onClick={() => setOpenJobDetailModal(true)} className='bg-blue-500 hover:bg-blue-600 transition-[background] rounded-md text-white px-4 py-2 text-sm'>Detail</button>
          <div className='flex items-center gap-2'>
            <button className='bg-green-600 hover:bg-green-700 transition-[background] rounded-md text-white px-3 text-lg py-2'><MdCheck /></button>
            <button className='bg-red-500 hover:bg-red-600 transition-[background[ rounded-md text-white px-3 py-2 text-lg'><AiOutlineClose /></button>
          </div>
        </div>
      </div>

      <JobDetailModal
        openModal={openJobDetailModal}
        setOpenModal={setOpenJobDetailModal}
      />
    </>
  )
}

export default OrganizationCard