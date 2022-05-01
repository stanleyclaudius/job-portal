import { useEffect, useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const HireModal = ({ openModal, setOpenModal }: IProps) => {
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
      <div ref={modalRef} className={`${openModal ? 'translate-y-0' : '-translate-y-12'} modal-box max-w-[500px] max-h-[600px] overflow-auto hide-scrollbar`}>
        <div className='modal-box-header'>
          <h1 className='text-lg font-medium'>Hire Lorem Ipsum As</h1>
          <AiOutlineClose className='cursor-auto' />
        </div>
        <div className='p-7'>
          <form>
            <input type='text' placeholder='Frontend Engineer' className='w-full outline-0 border border-gray-300 text-sm px-2 h-12 rounded-md' />
            <button className='bg-blue-500 hover:bg-blue-600 transition-[background] w-full py-3 text-sm rounded-md mt-8 text-white'>Send Invitation</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HireModal