import { useEffect, useRef } from 'react'
import { AiOutlineClose } from "react-icons/ai"

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const UserDescriptionModal = ({ openModal, setOpenModal }: IProps) => {
  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openModal && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openModal])
  
  return (
    <div className={`${openModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] z-[9999] flex items-center justify-center p-8`}>
      <div ref={modalRef} className={`${openModal ? 'translate-y-0' : '-translate-y-12'} transition-transform bg-white w-full max-w-[600px] rounded-md`}>
        <div className='px-7 py-5 flex items-center justify-between border-b border-gray-300'>
          <h1 className='font-medium text-lg'>Lorem Ipsum Profile</h1>
          <AiOutlineClose onClick={() => setOpenModal(false)} className='cursor-pointer' />
        </div>
        <div className='p-7'>
          <div className='mb-8'>
            <div className='flex items-center gap-5'>
              <div className='w-16 h-16 w-full bg-gray-300 rounded-full shrink-0'></div>
              <div>
                <h1 className='font-medium text-lg'>Lorem Ipsum</h1>
                <p className='text-gray-700 text-sm mt-2'>Jawa Tengah</p>
              </div>
            </div>
          </div>
          <div className='mb-8'>
            <h1 className='font-medium text-lg'>Skills</h1>
            <div className='flex items-center gap-3 mt-3'>
              <p className='bg-gray-200 text-sm rounded-full px-3 py-1 w-fit truncate'>Frontend</p>
              <p className='bg-gray-200 text-sm rounded-full px-3 py-1 w-fit truncate'>Backend</p>
              <p className='bg-gray-200 text-sm rounded-full px-3 py-1 w-fit truncate'>Data Analyst</p>
            </div>
          </div>
          <div className='mb-8'>
            <h1 className='font-medium text-lg'>About</h1>
            <p className='text-sm text-gray-700 leading-loose mt-3 text-justify'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. A quidem, cumque nisi ad odio sunt iure ullam dolores pariatur repudiandae illum itaque optio ratione! Quam excepturi praesentium nostrum fugiat, sunt labore a rem quod aut deserunt perspiciatis. Explicabo totam doloribus atque, inventore nostrum ex, modi assumenda provident quo impedit reiciendis.
            </p>
          </div>
          <button className='bg-red-500 hover:bg-red-600 transition-[background] w-full rounded-md text-white py-2'>View CV</button>
        </div>
      </div>
    </div>
  )
}

export default UserDescriptionModal