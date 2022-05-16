import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { FormSubmit, RootStore } from '../../utils/Interface'
import { ALERT } from '../../redux/types/alertTypes'
import { createCategory } from '../../redux/actions/categoryActions'
import Loader from '../general/Loader'

export interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateCategoryModal = ({ openModal, setOpenModal }: IProps) => {
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)

  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()

    if (!category) {
      return dispatch({
        type: ALERT,
        payload: { error: 'Please provide category name.' }
      })
    }

    setLoading(true)
    await dispatch(createCategory({ name: category }, `${auth.accessToken}`))
    setLoading(false)
  }

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
      <div ref={modalRef} className={`${openModal ? 'translate-y-0' : '-translate-y-12'} modal-box max-w-[550px] overflow-auto hide-scrollbar`}>
        <div className='modal-box-header'>
          <h1 className='font-medium text-lg'>Create Category</h1>
          <AiOutlineClose onClick={() => setOpenModal(false)} className='cursor-pointer' />
        </div>
        <div className='p-7'>
          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label htmlFor='category' className='text-sm'>Category</label>
              <input type='text' id='category' name='category' value={category} onChange={e => setCategory(e.target.value)} className='outline-0 border border-gray-300 mt-3 text-sm rounded-md w-full px-2 h-10' />
            </div>
            <button className={`${loading ? 'bg-gray-200 hover:bg-gray-200 cursor-auto' : 'bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer'} transition-[background] mt-2 text-sm text-white w-full rounded-md py-3`}>
              {
                loading
                ? <Loader />
                : 'Submit'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
 }

 export default CreateCategoryModal