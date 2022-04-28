import { useState, useEffect, useRef } from 'react'
import Head from "next/head"
import { AiFillCaretDown } from "react-icons/ai"
import Footer from "../components/general/Footer"
import Navbar from "../components/general/Navbar"
import JobCard from "../components/jobs/JobCard"
import JobDetail from "../components/jobs/JobDetail"

const Jobs = () => {
  const [openJobLevel, setOpenJobLevel] = useState(false)
  const [openEmploymentType, setOpenEmploymentType] = useState(false)
  const [openSalary, setOpenSalary] = useState(false)

  const jobLevelRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const employmentTypeRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const salaryRef = useRef() as React.MutableRefObject<HTMLDivElement>

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
    <>
      <Head>
        <title>Job Seek | Jobs</title>
      </Head>
      <Navbar />
      <div className='md:py-10 py-7 md:px-16 px-5'>
        <form className='flex shadow-xl w-full border border-gray-200 rounded-full h-14 items-center justify-between px-4'>
          <input type='text' placeholder='Job title or keyword' className='w-full outline-0 px-3 rounded-full text-sm' />
          <button className='outline-0 bg-[#504ED7] hover:bg-[#2825C2] transition-[background] px-5 py-2 text-white text-sm rounded-full'>Search</button>
        </form>
      </div>
      <div className='flex items-center md:px-16 px-5 md:mb-10 mb-7 md:gap-10 gap-7'>
        <div ref={jobLevelRef} className='relative'>
          <div onClick={() => setOpenJobLevel(!openJobLevel)} className='text-gray-700 flex items-center gap-2 cursor-pointer'>
            <p className='text-sm'>Job Level</p>
            <AiFillCaretDown />
          </div>
          <div className={`absolute top-[100%] left-0 mt-3 w-[250px] ${openJobLevel ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top bg-white rounded-md border border-gray-200 shadow-md text-sm p-3 flex flex-col gap-3`}>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='internship' />
              <label htmlFor='internship'>Internship</label>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='junior' />
              <label htmlFor='junior'>Entry Level / Junior</label>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='supervisor' />
              <label htmlFor='supervisor'>Associate / Supervisor</label>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='senior' />
              <label htmlFor='senior'>Mid-Senior Level / Manager</label>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='director' />
              <label htmlFor='director'>Director / Executive</label>
            </div>
          </div>
        </div>
        <div ref={employmentTypeRef} className='relative'>
          <div onClick={() => setOpenEmploymentType(!openEmploymentType)} className='text-gray-700 flex items-center gap-2 cursor-pointer'>
            <p className='text-sm'>Employment Type</p>
            <AiFillCaretDown />
          </div>
          <div className={`absolute top-[100%] left-0 mt-3 w-[250px] ${openEmploymentType ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top bg-white rounded-md border border-gray-200 shadow-md text-sm p-3 flex flex-col gap-3`}>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='fullTime' />
              <label htmlFor='fullTime'>Full Time</label>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='partTIme' />
              <label htmlFor='partTIme'>Part Time</label>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='freelance' />
              <label htmlFor='freelance'>Freelance</label>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='contractual' />
              <label htmlFor='contractual'>Contractual</label>
            </div>
          </div>
        </div>
        <div ref={salaryRef} className='relative'>
          <div onClick={() => setOpenSalary(!openSalary)} className='text-gray-700 flex items-center gap-2 cursor-pointer'>
            <p className='text-sm'>Salary</p>
            <AiFillCaretDown />
          </div>
          <div className={`absolute top-[100%] md:left-0 right-0 mt-3 w-[350px] ${openSalary ? 'scale-y-1' : 'scale-y-0'} transition-[transform] origin-top bg-white rounded-md border border-gray-200 shadow-md text-sm p-3 flex flex-col gap-3`}>
            <input type='number' placeholder='Minimum salary' className='outline-0 w-full border border-gray-200 rounded-md shadow-sm h-10 px-2 mb-2' />
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <input type='radio' id='hourly' name='salary' />
                <label htmlFor="hourly">Hourly</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' id='monthly' name='salary' />
                <label htmlFor="monthly">Monthly</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' id='yearly' name='salary' />
                <label htmlFor="yearly">Yearly</label>
              </div>
            </div>
            <button className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-sm w-full py-2 text-white rounded-sm mt-3'>Apply Filter</button>
          </div>
        </div>
      </div>
      <div className='bg-gray-100 flex pt-10 pb-7 md:px-16 px-5 gap-8 h-[750px]'>
        <div className='flex-1 overflow-auto hide-scrollbar'>
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
        <div className='flex-[2] bg-white rounded-md border border-gray-200 p-5 overflow-auto hide-scrollbar fixed top-0 right-0 bottom-0 left-[3000px] transition-all shadow-xl z-[999] md:z-auto md:static md:shadow-none'>
          <JobDetail />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Jobs