import { useEffect, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const OrganizationDetailModal = ({ openModal, setOpenModal }: IProps) => {
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
      <div ref={modalRef} className={`${openModal ? 'translate-y-0' : '-translate-y-12'} modal-box max-w-[600px] max-h-[600px] overflow-auto hide-scrollbar`}>
        <div className='modal-box-header'>
          <h1 className='text-lg font-medium'>Organization Detail</h1>
          <AiOutlineClose onClick={() => setOpenModal(false)} className='cursor-pointer' />
        </div>
        <div className='p-7'>
          <div className='flex items-center gap-4'>
            <div className='w-20 h-20 rounded-full bg-gray-200'></div>
            <div>
              <h1 className='font-medium text-lg'>PT. Lorem Ipsum</h1>
              <p className='text-gray-500 mt-2 text-sm'>Jawa Tengah, Slamen, Kebumen, 20211</p>
            </div>
          </div>
          <div className='mt-7'>
            <h1 className='font-medium text-lg mb-3'>Description</h1>
            <p className='text-sm text-gray-600 leading-loose'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur consequatur nobis amet vero reiciendis harum temporibus voluptates accusantium consectetur. Ullam dicta quis delectus ipsum minima est quam nostrum accusantium deserunt, asperiores voluptates earum eligendi perferendis corporis consequuntur? Quae nisi repudiandae dolorum, voluptatum illum quos rerum reprehenderit, ducimus odio, doloremque quam!
            </p>
          </div>
          <div className='mt-7'>
            <h1 className='font-medium text-lg mb-3'>Address</h1>
            <p>Jln. Kebayoran Baru, No. 25ABC</p>
          </div>
          <div className='mt-7'>
            <h1 className='font-medium text-lg mb-3'>Phone Number</h1>
            <p>0812 2929 2823</p>
          </div>
          <div className='mt-7'>
            <h1 className='font-medium text-lg mb-3'>Estimated Total Employee</h1>
            <p>&plusmn; 250 - 300 people</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizationDetailModal