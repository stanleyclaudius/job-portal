import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import { FormSubmit, RootStore } from './../../utils/Interface'
import { createJob } from './../../redux/actions/jobActions'
import { ALERT } from './../../redux/types/alertTypes'
import Editor from './../../utils/Editor'
import Loader from './../general/Loader'
import { ICategory } from '../../redux/types/categoryTypes'
import { getDataAPI } from '../../utils/fetchData'

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateJobModal = ({ openModal, setOpenModal }: IProps) => {
  const [skills, setSkills] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [requirement, setRequirement] = useState('')
  const [position, setPosition] = useState('')
  const [jobLevel, setJobLevel] = useState('')
  const [employmentType, setEmploymentType] = useState('')
  const [salary, setSalary] = useState(0)
  const [keywords, setKeywords] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('')
  const [categoryData, setCategoryData] = useState<ICategory[]>([])

  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)

  const handleChangeSkills = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' && (e.target as HTMLInputElement).value !== ',') {
      const val = (e.target as HTMLInputElement).value
      if (skills.includes(val.substring(0, val.length - 1)))
        (e.target as HTMLInputElement).value = ''
      else {
        setSkills([...skills, val.substring(0, val.length - 1)]);
        (e.target as HTMLInputElement).value = ''
      }
    }
  }

  const handleChangeKeywords = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' && (e.target as HTMLInputElement).value !== ',') {
      const val = (e.target as HTMLInputElement).value
      if (keywords.includes(val.substring(0, val.length - 1)))
        (e.target as HTMLInputElement).value = ''
      else {
        setKeywords([...keywords, val.substring(0, val.length - 1)]);
        (e.target as HTMLInputElement).value = ''
      }
    }
  }

  const handleRemoveSkill = (idx: number) => {
    const skillCopy = [...skills]
    skillCopy.splice(idx, 1)
    setSkills(skillCopy)
  }

  const handleRemoveKeyword = (idx: number) => {
    const keywordCopy = [...keywords]
    keywordCopy.splice(idx, 1)
    setKeywords(keywordCopy)
  }

  const handleSubmit = async(e: FormSubmit) => {
    e.preventDefault()

    if (!position) {
      return dispatch({
        type: ALERT,
        payload: { error: 'Please provide job position.' }
      })
    }

    if (!jobLevel) {
      return dispatch({
        type: ALERT,
        payload: { error: 'Please provide job level.' }
      })
    }

    if (!employmentType) {
      return dispatch({
        type: ALERT,
        payload: { error: 'Please provide employment type.' }
      })
    }

    if (skills.length < 1) {
      return dispatch({
        type: ALERT,
        payload: { error: 'Please provide at least 1 skill.' }
      })
    }

    if (salary < 10000) {
      return dispatch({
        type: ALERT,
        payload: { error: 'Salary should be at least IDR 10.000' }
      })
    }

    if (!description) {
      return dispatch({
        type: ALERT,
        payload: { error: 'Please provide job overview.' }
      })
    }

    if (description.length < 100) {
      return dispatch({
        type: ALERT,
        payload: { error: 'Job overview should be at least 100 characters.' }
      })
    }

    if (!requirement) {
      return dispatch({
        type: ALERT,
        payload: { error: 'Please provide job requirement.' }
      })
    }

    if (keywords.length < 1) {
      return dispatch({
        type: ALERT,
        payload: { error: 'Please provide at least 1 keyword.' }
      })
    }

    setLoading(true)
    await dispatch(createJob({ position, jobLevel, category, employmentType, skills, keywords, salary, requirements: requirement, overview: description }, `${auth.accessToken}`))
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

  useEffect(() => {
    const fetchCategory = async() => {
      const res = await getDataAPI('category')
      setCategoryData(res.data.categories)
    }

    fetchCategory()
  }, [])
  
  return (
    <div className={`${openModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} modal-background`}>
      <div ref={modalRef} className={`${openModal ? 'translate-y-0' : '-translate-y-12'} modal-box max-w-[609px] h-[600px] overflow-auto hide-scrollbar`}>
        <div className='modal-box-header'>
          <h1 className='font-medium text-lg'>Create Job</h1>
          <AiOutlineClose onClick={() => setOpenModal(false)} className='cursor-pointer' />
        </div>
        <div className='p-7'>
          <form onSubmit={handleSubmit}>  
            <div className='mb-6'>
              <label htmlFor='position' className='text-sm'>Position</label>
              <input type='text' id='position' name='position' value={position} onChange={e => setPosition(e.target.value)} className='outline-0 border border-gray-300 mt-3 text-sm rounded-md w-full px-2 h-10' />
            </div>
            <div className='mb-6'>
              <label htmlFor='category' className='text-sm'>Category</label>
              <select name='category' id='category' value={category} onChange={e => setCategory(e.target.value)} className='outline-0 border border-gray-300 mt-3 text-sm rounded-md w-full px-2 h-10 bg-white'>
                <option value=''>- Category -</option>
                {
                  categoryData.map(item => (
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))
                }
              </select>
            </div>
            <div className='mb-6'>
              <label htmlFor='jobLevel' className='text-sm'>Job Level</label>
              <select name='jobLevel' id='jobLevel' value={jobLevel} onChange={e => setJobLevel(e.target.value)} className='outline-0 border border-gray-300 mt-3 text-sm rounded-md w-full px-2 h-10 bg-white'>
                <option value=''>- Job Level -</option>
                <option value='internship'>Internship</option>
                <option value='entryLevel'>Entry Level / Junior</option>
                <option value='associate'>Associate / Supervisor</option>
                <option value='manager'>Mid-Senior Level / Manager</option>
                <option value='director'>Director / Executive</option>
              </select>
            </div>
            <div className='mb-6'>
              <label htmlFor='employmentType' className='text-sm'>Employment Type</label>
              <select name='employmentType' id='employmentType' value={employmentType} onChange={e => setEmploymentType(e.target.value)} className='outline-0 border border-gray-300 mt-3 text-sm rounded-md w-full px-2 h-10 bg-white'>
                <option value=''>- Employment Type -</option>
                <option value='fullTime'>Full Time</option>
                <option value='partTime'>Part TIme</option>
                <option value='freelance'>Freelance</option>
                <option value='contractual'>Contractual</option>
              </select>
            </div>
            <div className='mb-6'>
              <label htmlFor='skills' className='text-sm'>Skills Required</label>
              <div className='border border-gray-300 mt-3 rounded-md flex items-center px-2 min-h-20 flex-wrap'>
                <div className='flex items-center gap-3 flex-wrap my-2'>
                  {
                    skills.map((item, idx) => (
                      <div key={item} className='rounded-md bg-gray-100 px-3 py-1 flex items-center gap-2 break-words'>
                        <p className='text-sm'>{item}</p>
                        <div className='bg-gray-300 text-gray-600 w-fit rounded-full p-1 cursor-pointer'>
                          <AiOutlineClose onClick={() => handleRemoveSkill(idx)} className='text-xs' />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <input type='text' onKeyUp={e => handleChangeSkills(e)} className='outline-0 text-sm w-full px-2 h-10 flex-1' />
              </div>
            </div>
            <div className='mb-6'>
              <label htmlFor='salary' className='text-sm'>Salary</label>
              <input type='number' id='salary' name='salary' value={salary} onChange={e => setSalary(parseInt(e.target.value))} className='outline-0 border border-gray-300 mt-3 rounded-md w-full text-sm px-2 h-10' min={1} /> 
            </div>
            <div className='mb-6'>
              <label htmlFor='description' className='text-sm'>Job Overview</label>
              <Editor
                content={description}
                setContent={setDescription}
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='requirement' className='text-sm'>Requirements</label>
              <Editor
                content={requirement}
                setContent={setRequirement}
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='skills' className='text-sm'>Keywords</label>
              <div className='border border-gray-300 mt-3 rounded-md flex items-center px-2 min-h-20 flex-wrap'>
                <div className='flex items-center gap-3 flex-wrap my-2'>
                  {
                    keywords.map((item, idx) => (
                      <div key={item} className='rounded-md bg-gray-100 px-3 py-1 flex items-center gap-2 break-words'>
                        <p className='text-sm'>{item}</p>
                        <div className='bg-gray-300 text-gray-600 w-fit rounded-full p-1 cursor-pointer'>
                          <AiOutlineClose onClick={() => handleRemoveKeyword(idx)} className='text-xs' />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <input type='text' onKeyUp={e => handleChangeKeywords(e)} className='outline-0 text-sm w-full px-2 h-10 flex-1' />
              </div>
            </div>
            <button className={`${loading ? 'bg-gray-200 hover:bg-gray-200 cursor-auto' : 'bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer'} transition-[background] text-sm text-white w-full rounded-md py-3`}>
              {
                loading
                ? <Loader />
                : 'Post Job'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateJobModal