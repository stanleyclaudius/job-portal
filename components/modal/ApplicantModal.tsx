import { useEffect, useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"
import UserCard from "../general/UserCard"

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ApplicantModal = ({ openModal, setOpenModal }: IProps) => {
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
    <div className={`${openModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,.7)] p-10 z-[9999]`}>
      <div ref={modalRef} className={`${openModal ? 'translate-y-0' : '-translate-y-12'} transition-transform bg-white w-full max-w-[950px] rounded-md max-h-[600px] overflow-auto hide-scrollbar`}>
        <div className='px-7 py-5 flex items-center justify-between border-b border-gray-300'>
          <h1 className='text-lg font-medium'>Applicant List</h1>
          <AiOutlineClose className='cursor-auto' />
        </div>
        <div className='p-7 grid lg:grid-cols-2 grid-cols-1 gap-8'>
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
    </div>
  )
}

export default ApplicantModal