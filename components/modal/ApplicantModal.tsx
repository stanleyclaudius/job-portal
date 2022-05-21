import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { AppDispatch, RootState } from './../../redux/store'
import { getApplicants } from './../../redux/slices/applicantSlice'
import UserCard from './../general/UserCard'

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  jobId: string
}

const ApplicantModal = ({ openModal, setOpenModal, jobId }: IProps) => {
  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch<AppDispatch>()
  const { auth, applicant } = useSelector((state: RootState) => state)

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openModal && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openModal])

  useEffect(() => {
    if (jobId && auth.accessToken) {
      dispatch(getApplicants({ jobId, token: auth.accessToken }))
    }
  }, [jobId, auth, dispatch])

  return (
    <div className={`modal-background ${openModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div ref={modalRef} className={`${openModal ? 'translate-y-0' : '-translate-y-12'} modal-box max-w-[950px] max-h-[600px] overflow-auto hide-scrollbar`}>
        <div className='modal-box-header'>
          <h1 className='text-lg font-medium'>Applicant List</h1>
          <AiOutlineClose onClick={() => setOpenModal(false)} className='cursor-pointer' />
        </div>
        {
          applicant.length === 0
          ? (
            <div className='p-7'>
              <div className='bg-red-500 text-center text-white text-sm rounded-md py-3'>There's no job posted data found.</div>
            </div>
          )
          : (
            <div className='p-7 grid lg:grid-cols-2 grid-cols-1 gap-8'>
              {
                applicant.map(item => (
                  <UserCard key={item._id} isApplicant={true} item={item} />
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ApplicantModal