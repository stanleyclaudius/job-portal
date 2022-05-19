import { useEffect, useRef } from 'react'
import Image from 'next/image'
import DeleteImage from './../../public/images/delete.svg'

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  text: string
  onSuccess: () => void
}

const DeleteModal = ({ openModal, setOpenModal, text, onSuccess }: IProps) => {
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
      <div ref={modalRef} className={`${openModal ? 'translate-y-0' : '-translate-y-12'} modal-box max-w-[500px] text-center p-7`}>
        <Image src={DeleteImage} alt='Job Seek' />
        <h1 className='font-medium text-lg my-8'>Are you sure want to delete this {text}?</h1>
        <div className='flex items-center gap-5 justify-center text-sm'>
          <button onClick={onSuccess} className='bg-red-500 hover:bg-red-600 transition-[background] text-white rounded-md px-4 py-2'>Yes, delete it</button>
          <button onClick={() => setOpenModal(false)} className='bg-gray-200 px-4 py-2'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal