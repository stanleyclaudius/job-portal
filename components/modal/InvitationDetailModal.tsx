import { useEffect, useRef } from "react"
import { AiOutlineClose } from "react-icons/ai"

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const InvitationDetailModal = ({ openModal, setOpenModal }: IProps) => {
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
      <div ref={modalRef} className={`${openModal ? 'translate-y-0' : '-translate-y-12'} transition-transform bg-white w-full max-w-[600px] rounded-md h-[650px] overflow-auto hide-scrollbar`}>
        <div className='px-7 py-5 flex items-center justify-between border-b border-gray-300'>
          <h1 className='font-medium text-lg'>Invitation Detail</h1>
          <AiOutlineClose onClick={() => setOpenModal(false)} className='cursor-pointer' />
        </div>
        <div className='p-7'>
          <div className='flex items-center gap-5'>
            <div className='w-16 h-16 rounded-md bg-gray-200 shrink-0'></div>
            <div>
              <h1 className='text-[#504ED7] text-lg'>Recruitment Manager</h1>
              <p className='text-xs mt-2'>PT Orang Tua Group</p>
            </div>
          </div>
          <div className='mt-5'>
            <p className='font-medium mb-4'>Job Overview</p>
            <p className='text-sm leading-relaxed mb-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, vel officiis. Necessitatibus, iusto quod fuga placeat aperiam quaerat illum optio facilis. Eum architecto nemo enim deserunt rerum impedit dolore dignissimos, excepturi, inventore saepe eligendi earum!</p>
            <p className='text-sm leading-relaxed mb-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur eos explicabo temporibus tempora unde tenetur accusantium quia cumque ullam autem aperiam odio, ipsa totam quod minima dolores! Delectus error dolor quibusdam eius sequi nulla ipsam.</p>
            <p className='font-medium mb-4'>Skills and Expertise</p>
            <div className='flex items-center gap-3 mb-7'>
              <p className='bg-gray-200 text-gray-600 text-xs px-3 py-2 rounded-full'>Management</p>
              <p className='bg-gray-200 text-gray-600 text-xs px-3 py-2 rounded-full'>UX Design</p>
              <p className='bg-gray-200 text-gray-600 text-xs px-3 py-2 rounded-full'>UI Design</p>
            </div>
            <p className='font-medium mb-4'>Requirements</p>
            <ul className='mb-7 list-disc ml-5'>
              <li>HTML</li>
              <li>CSS</li>
              <li>Javascipt</li>
            </ul>
            <p className='font-medium mb-4'>Salary</p>
            <div className='flex items-center mb-7'>
              <p className='font-semibold text-lg'>20000</p>
              <p className='text-gray-500 text-xs'>/month</p>
            </div>
            <p className='font-medium mb-4'>Company Overview</p>
            <p className='text-sm leading-relaxed mb-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores illo fugit mollitia! Quidem, dignissimos magnam sed pariatur asperiores, velit ex quos ad possimus itaque nobis nemo optio at? Quia quod molestiae illo commodi expedita exercitationem.</p>
            <p className='text-sm leading-relaxed mb-7'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores illo fugit mollitia! Quidem, dignissimos magnam sed pariatur asperiores, velit ex quos ad possimus itaque nobis nemo optio at? Quia quod molestiae illo commodi expedita exercitationem.</p>
            <p className='font-medium mb-4'>Company Location</p>
            <p className='mb-7 text-sm leading-realxed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, tempore.</p>
            <p className='font-medium mb-4'>Estimated Company Total Employee</p>
            <p>25-30 people</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvitationDetailModal