import { useState, useEffect, useRef } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { InputChange } from './../../utils/Interface'

interface IProps {
  selectedJobLevel: string[]
  setSelectedJobLevel: React.Dispatch<React.SetStateAction<string[]>>
  selectedEmploymentType: string[]
  setSelectedEmploymentType: React.Dispatch<React.SetStateAction<string[]>>
  minSalary: number
  setMinSalary: React.Dispatch<React.SetStateAction<number>>
  handleFilter: () => void
}

const Filter = ({
  selectedJobLevel,
  setSelectedJobLevel,
  selectedEmploymentType,
  setSelectedEmploymentType,
  minSalary,
  setMinSalary,
  handleFilter
}: IProps) => {
  const [openJobLevel, setOpenJobLevel] = useState(false)
  const [openEmploymentType, setOpenEmploymentType] = useState(false)
  const [openSalary, setOpenSalary] = useState(false)

  const jobLevelRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const employmentTypeRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const salaryRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleChangeJobLevel = (e: InputChange) => {
    const isExists = selectedJobLevel.find(item => item === e.target.value)
    if (isExists) {
      setSelectedJobLevel(selectedJobLevel.filter(item => item !== e.target.value))
    } else {
      setSelectedJobLevel([...selectedJobLevel, e.target.value])
    }
  }

  const handleChangeEmploymentType = (e: InputChange) => {
    const isExists = selectedEmploymentType.find(item => item === e.target.value)
    if (isExists) {
      setSelectedEmploymentType(selectedEmploymentType.filter(item => item !== e.target.value))
    } else {
      setSelectedEmploymentType([...selectedEmploymentType, e.target.value])
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openJobLevel && jobLevelRef.current && !jobLevelRef.current.contains(e.target as Node)) {
        setOpenJobLevel(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openJobLevel])

  useEffect(() => {
    const checkIfClickeddOutside = (e: MouseEvent) => {
      if (openEmploymentType && employmentTypeRef.current && !employmentTypeRef.current.contains(e.target as Node)) {
        setOpenEmploymentType(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickeddOutside)
    return () => document.removeEventListener('mousedown', checkIfClickeddOutside)
  }, [openEmploymentType])

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openSalary && salaryRef.current && !salaryRef.current.contains(e.target as Node)) {
        setOpenSalary(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openSalary])

  return (
    <div className='flex items-center md:px-16 px-5 md:mb-10 mb-7 md:gap-10 gap-7'>
      <div ref={jobLevelRef} className='relative'>
        <div onClick={() => setOpenJobLevel(!openJobLevel)} className='text-gray-700 flex items-center gap-2 cursor-pointer'>
          <p className='text-sm'>Job Level</p>
          <AiFillCaretDown />
        </div>
        <div className={`absolute top-[100%] left-0 mt-3 w-[250px] ${openJobLevel ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top bg-white rounded-md border border-gray-200 shadow-md text-sm p-3 flex flex-col gap-3`}>
          <div className='flex items-center gap-2'>
            <input type='checkbox' id='internship' checked={selectedJobLevel.includes('internship') ? true : false} value='internship' onChange={handleChangeJobLevel} />
            <label htmlFor='internship'>Internship</label>
          </div>
          <div className='flex items-center gap-2'>
            <input type='checkbox' id='entryLevel' checked={selectedJobLevel.includes('entryLevel') ? true : false} value='entryLevel' onChange={handleChangeJobLevel} />
            <label htmlFor='entryLevel'>Entry Level / Junior</label>
          </div>
          <div className='flex items-center gap-2'>
            <input type='checkbox' id='associate' checked={selectedJobLevel.includes('associate') ? true : false} value='associate' onChange={handleChangeJobLevel} />
            <label htmlFor='associate'>Associate / Supervisor</label>
          </div>
          <div className='flex items-center gap-2'>
            <input type='checkbox' id='manager' checked={selectedJobLevel.includes('manager') ? true : false} value='manager' onChange={handleChangeJobLevel} />
            <label htmlFor='manager'>Mid-Senior Level / Manager</label>
          </div>
          <div className='flex items-center gap-2'>
            <input type='checkbox' id='director' checked={selectedJobLevel.includes('director') ? true : false} value='director' onChange={handleChangeJobLevel} />
            <label htmlFor='director'>Director / Executive</label>
          </div>
          <button onClick={handleFilter} className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-sm w-full py-2 text-white rounded-sm mt-3'>Apply Filter</button>
        </div>
      </div>
      <div ref={employmentTypeRef} className='relative'>
        <div onClick={() => setOpenEmploymentType(!openEmploymentType)} className='text-gray-700 flex items-center gap-2 cursor-pointer'>
          <p className='text-sm'>Employment Type</p>
          <AiFillCaretDown />
        </div>
        <div className={`absolute top-[100%] left-0 mt-3 w-[250px] ${openEmploymentType ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top bg-white rounded-md border border-gray-200 shadow-md text-sm p-3 flex flex-col gap-3`}>
          <div className='flex items-center gap-2'>
            <input type='checkbox' id='fullTime' checked={selectedEmploymentType.includes('fullTime') ? true : false} value='fullTime' onChange={handleChangeEmploymentType} />
            <label htmlFor='fullTime'>Full Time</label>
          </div>
          <div className='flex items-center gap-2'>
            <input type='checkbox' id='partTIme' checked={selectedEmploymentType.includes('partTime') ? true : false} value='partTime' onChange={handleChangeEmploymentType} />
            <label htmlFor='partTIme'>Part Time</label>
          </div>
          <div className='flex items-center gap-2'>
            <input type='checkbox' id='freelance' checked={selectedEmploymentType.includes('freelance') ? true : false} value='freelance' onChange={handleChangeEmploymentType} />
            <label htmlFor='freelance'>Freelance</label>
          </div>
          <div className='flex items-center gap-2'>
            <input type='checkbox' id='contractual' checked={selectedEmploymentType.includes('contractual') ? true : false} value='contractual' onChange={handleChangeEmploymentType} />
            <label htmlFor='contractual'>Contractual</label>
          </div>
          <button onClick={handleFilter} className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-sm w-full py-2 text-white rounded-sm mt-3'>Apply Filter</button>
        </div>
      </div>
      <div ref={salaryRef} className='relative'>
        <div onClick={() => setOpenSalary(!openSalary)} className='text-gray-700 flex items-center gap-2 cursor-pointer'>
          <p className='text-sm'>Salary</p>
          <AiFillCaretDown />
        </div>
        <div className={`absolute top-[100%] md:left-0 right-0 mt-3 w-[350px] ${openSalary ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top bg-white rounded-md border border-gray-200 shadow-md text-sm p-3 flex flex-col gap-3`}>
          <input type='number' placeholder='Minimum salary' value={minSalary} onChange={e => setMinSalary(parseInt(e.target.value))} className='outline-0 w-full border border-gray-200 rounded-md shadow-sm h-10 px-2 mb-2' />
          <button onClick={handleFilter} className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-sm w-full py-2 text-white rounded-sm mt-3'>Apply Filter</button>
        </div>
      </div>
    </div>
  )
}

export default Filter