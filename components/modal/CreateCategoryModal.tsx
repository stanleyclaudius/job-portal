import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { FormSubmit, InputChange, ICategory } from './../../utils/Interface'
import { createCategory, updateCategory } from './../../redux/slices/categorySlice'
import { AppDispatch, RootState } from './../../redux/store'
import Loader from './../general/Loader'

export interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  selectedItem: ICategory
}

const CreateCategoryModal = ({ openModal, setOpenModal, selectedItem }: IProps) => {
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<File[]>([])
  const [urlImage, setUrlImage] = useState('')

  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch<AppDispatch>()
  const { auth } = useSelector((state: RootState) => state)

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()

    if (!category) {
      return dispatch({
        type: 'alert/alert',
        payload: { error: 'Please provide category name.' }
      })
    }

    setLoading(true)
    if (Object.keys(selectedItem).length > 0) {
      await dispatch(updateCategory({ name: category, image, _id: selectedItem._id, prevImg: urlImage, token: `${auth.accessToken}` }))
    } else {
      await dispatch(createCategory({ name: category, image, token: `${auth.accessToken}` }))
    }
    setLoading(false)
    setOpenModal(false)
  }

  const handleChangeImage = (e: InputChange) => {
    const target = e.target as HTMLInputElement
    const files = [...Object.values(target.files!)]
    setImage([...files])
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

  useEffect(() => {
    if (Object.keys(selectedItem).length > 0) {
      setCategory(selectedItem.name)
      setUrlImage(selectedItem.image as string)
    }

    return () => {
      setCategory('')
      setUrlImage('')
      setImage([])
    }
  }, [selectedItem])

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
            <div className='mb-6'>
              <label htmlFor='image' className='text-sm'>Image</label>
              <div className='flex gap-5 mt-3'>
                <div className='w-20 h-20 rounded-full border border-gray-300 shrink-0'>
                  <img src={image.length > 0 ? URL.createObjectURL(image[0]) : urlImage} alt={category} className='w-full h-full rounded-full object-cover' />
                </div>
                <input type='file' id='image' accept='image/*' onChange={handleChangeImage} className='outline-0 border border-gray-300 text-sm rounded-md w-full px-2 h-10' />
              </div>
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