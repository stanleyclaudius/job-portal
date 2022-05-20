import { useEffect, useRef } from 'react'
import Image from 'next/image'
import SendImage from './../../public/images/send.svg'

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  company: string
  position: string
  onClick: () => void
}

const RecheckCVModal = ({ openModal, setOpenModal, company, position, onClick }: IProps) => {
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
    <div className={`${openModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} modal-background`}>
      <div ref={modalRef} className={`${openModal ? 'translate-y-0' : '-translate-y-12'} modal-box max-w-[550px] overflow-auto hide-scrollbar pb-10 pt-6 text-center`}>
        <Image src={SendImage} alt='Job Seek' width={300} height={300} />
        <h1>Send application to {company} as {position}?</h1>
        <div className='flex items-center gap-8 justify-center mt-7'>
          <button onClick={onClick} className='bg-green-500 hover:bg-green-600 text-sm transition-[background] text-white rounded-md px-4 py-3'>Yes, Send It</button>
          <button onClick={() => setOpenModal(false)} className='text-sm transition-[background] text-red-500'>No, let me check my profile again</button>
        </div>
      </div>
    </div>
  )
}

export default RecheckCVModal