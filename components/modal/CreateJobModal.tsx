import { useState, useEffect, useRef, ChangeEvent } from "react"
import { AiOutlineClose } from "react-icons/ai"
import Editor from "../../utils/Editor"

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateJobModal = ({ openModal, setOpenModal }: IProps) => {
  const [skills, setSkills] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [requirement, setRequirement] = useState('')

  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

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

  const handleRemoveSkill = (idx: number) => {
    const skillCopy = [...skills]
    skillCopy.splice(idx, 1)
    setSkills(skillCopy)
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
    <div className={`${openModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,.7)] flex items-center justify-center p-10 z-[9999]`}>
      <div ref={modalRef} className={`${openModal ? 'translate-y-0' : '-translate-y-12'} transition-transform bg-white w-full max-w-[609px] rounded-md h-[600px] overflow-auto hide-scrollbar`}>
        <div className='flex items-center justify-between px-7 py-5 border-b boder-gray-300'>
          <h1 className='font-medium text-lg'>Create Job</h1>
          <AiOutlineClose onClick={() => setOpenModal(false)} className='cursor-pointer' />
        </div>
        <div className='p-7'>
          <form>  
            <div className='mb-6'>
              <label htmlFor='position' className='text-sm'>Position</label>
              <input type='text' id='position' name='position' className='outline-0 border border-gray-300 mt-3 text-sm rounded-md w-full px-2 h-10  ' />
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
              <input type='number' className='outline-0 border border-gray-300 mt-3 rounded-md w-full text-sm px-2 h-10' min={1} /> 
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
            <button className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-sm text-white w-full rounded-md py-3'>Post Job</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateJobModal