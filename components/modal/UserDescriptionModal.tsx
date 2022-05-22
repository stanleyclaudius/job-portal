import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { RootState } from './../../redux/store'
import { IJobseeker } from './../../utils/Interface'
import Link from 'next/link'

const UserDescriptionModal = () => {
  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch()
  const { userDescription } = useSelector((state: RootState) => state)

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (userDescription && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        dispatch({
          type: 'userDescription/open',
          payload: null
        })
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [userDescription, dispatch])
  
  return (
    <div className={`${userDescription ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} modal-background z-[999999]`}>
      <div ref={modalRef} className={`${userDescription ? 'translate-y-0' : '-translate-y-12'} modal-box max-w-[600px] max-h-[550px] hide-scrollbar overflow-auto`}>
        {
          userDescription &&
          <>
            <div className='modal-box-header'>
              <h1 className='font-medium text-lg'>{(userDescription as IJobseeker)?.user.name} Profile</h1>
              <AiOutlineClose onClick={() => dispatch({ type: 'userDescription/open', payload: null })} className='cursor-pointer' />
            </div>
            <div className='p-7'>
              <div className='mb-8'>
                <div className='flex items-center gap-5'>
                  <div className='w-16 h-16 w-full rounded-full shrink-0 shadow-xl border border-gray-300'>
                    <img src={(userDescription as IJobseeker)?.user.avatar} alt={(userDescription as IJobseeker)?.user.name} className='w-full h-full rounded-full' />
                  </div>
                  <div>
                    <h1 className='font-medium text-lg'>{(userDescription as IJobseeker)?.user.name}</h1>
                    <p className='text-gray-700 text-sm mt-2'>Jawa Tengah</p>
                  </div>
                </div>
              </div>
              <div className='mb-8'>
                <h1 className='font-medium text-lg'>Skills</h1>
                <div className='flex items-center gap-3 mt-3'>
                  {
                    (userDescription as IJobseeker)?.skills.map(item => (
                      <p key={item} className='bg-gray-200 text-sm rounded-full px-3 py-1 w-fit truncate'>{item}</p>
                    ))
                  }
                </div>
              </div>
              <div className='mb-8'>
                <h1 className='font-medium text-lg'>About</h1>
                <p className='text-sm text-gray-700 leading-loose mt-3 text-justify'>
                  {(userDescription as IJobseeker)?.about}
                </p>
              </div>
              {
                (userDescription as IJobseeker)?.cv
                ? (
                  <Link href={`/cv/${(userDescription as IJobseeker)?._id}`}>
                    <a target='_blank' className='bg-red-500 block text-center hover:bg-red-600 transition-[background] w-full rounded-md text-white py-2'>View CV</a>
                  </Link>
                )
                : (
                  <p className='bg-red-500 text-center w-full rounded-md text-white py-2'>CV is not provided by the candidate</p>
                )
              }
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default UserDescriptionModal