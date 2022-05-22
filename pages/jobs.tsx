import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { AiOutlineSearch } from 'react-icons/ai'
import { FormSubmit, IJob } from './../utils/Interface'
import Head from 'next/head'
import axios from 'axios'
import Footer from './../components/general/Footer'
import Navbar from './../components/general/Navbar'
import Filter from './../components/jobs/Filter'
import JobCard from './../components/jobs/JobCard'

interface IProps {
  data: IJob[]
}

const Jobs = ({ data }: IProps) => {
  const [search, setSearch] = useState('')
  const [selectedJobLevel, setSelectedJobLevel] = useState<string[]>([])
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([])
  const [minSalary, setMinSalary] = useState(0)

  const router = useRouter()
  const [jobs, setJobs] = useState<IJob[]>([])

  const handleFilter = (e?: FormSubmit) => {
    e?.preventDefault()
    let url = '/jobs?'

    if (search) {
      url += `q=${search}&`
    }

    if (selectedJobLevel.length > 0) {
      for (let i = 0; i < selectedJobLevel.length; i++) {
        if (i === (selectedJobLevel.length - 1)) {
          url += `jobLevel=${selectedJobLevel[i]}&`
        } else {
          url += `jobLevel=${selectedJobLevel[i]}&`
        }
      }
    }

    if (selectedEmploymentType.length > 0) {
      for (let i = 0; i < selectedEmploymentType.length; i++) {
        if (i === (selectedEmploymentType.length - 1)) {
          url += `employmentType=${selectedEmploymentType[i]}&`
        } else {
          url += `employmentType=${selectedEmploymentType[i]}&`
        }
      }
    }

    if (minSalary > 0) {
      url += `salary=${minSalary}&`
    }

    router.push(url)
  }

  useEffect(() => {
    setJobs(data)
  }, [data])

  useEffect(() => {
    const jobLevelQuery = router.query.jobLevel
    const employmentTypeQuery = router.query.employmentType
    const salary = router.query.salary

    if (jobLevelQuery) {
      if (typeof jobLevelQuery !== 'string') {
        setSelectedJobLevel(jobLevelQuery)
      } else {
        setSelectedJobLevel([jobLevelQuery])
      }
    }

    if (employmentTypeQuery) {
      if (typeof employmentTypeQuery !== 'string') {
        setSelectedEmploymentType(employmentTypeQuery)
      } else {
        setSelectedEmploymentType([employmentTypeQuery])
      }
    }

    if (salary) {
      setMinSalary(parseInt(salary as string))
    }
  }, [router])

  return (
    <>
      <Head>
        <title>Job Seek | Jobs</title>
      </Head>
      <Navbar />
      <div className='md:py-10 py-7 md:px-16 px-5'>
        <div className='w-full m-auto bg-white shadow-xl border border-gray-200 md:rounded-full rounded-md md:h-16 h-auto md:py-0 py-6 px-4'>
          <form onSubmit={handleFilter} className='flex md:flex-row flex-col justify-between items-center h-full gap-3'>
            <div className='flex w-full items-center gap-3 md:mb-0 mb-5 md:border-none border-b border-gray-200 md:pb-0 pb-3 flex-1'>
              <AiOutlineSearch className='text-xl text-gray-500' />
              <input type='text' value={search} onChange={e => setSearch(e.target.value)} placeholder='Job title or keyword' className='outline-0 h-full px-2 w-full text-sm' />
            </div>
            <button className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-white text-sm px-6 py-2 rounded-full outline-0'>Search</button>
          </form>
        </div>
      </div>
      <Filter
        selectedJobLevel={selectedJobLevel}
        setSelectedJobLevel={setSelectedJobLevel}
        selectedEmploymentType={selectedEmploymentType}
        setSelectedEmploymentType={setSelectedEmploymentType}
        minSalary={minSalary}
        setMinSalary={setMinSalary}
        handleFilter={handleFilter}
      />
      <div className='bg-gray-100 pt-10 pb-7 md:px-16 px-5'>
        {
          jobs.length === 0
          ? (
            <div className='bg-red-500 text-center text-white rounded-md py-3'>There's no job available.</div>
          )
          : (
            <div className='grid gap-8 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
              {
                jobs.map(item => (
                  <JobCard key={item._id} item={item} />
                ))
              }
            </div>
          )
        }
      </div>
      <Footer />
    </>
  )
}

export default Jobs

export const getServerSideProps: GetServerSideProps = async(context) => {
  const q = context.query.q
  const jobLevel = context.query.jobLevel
  const employmentType = context.query.employmentType
  const salary = context.query.salary

  let url = `${process.env.CLIENT_URL}/api/job/all?`

  if (q) {
    url += `q=${q}&`
  }
  
  if (jobLevel) {
    if (typeof jobLevel !== 'string') {
      for (let i = 0; i < jobLevel.length; i++) {
        if (i !== ((jobLevel.length) - 1)) {
          url += `jobLevel=${jobLevel[i]}&`
        } else {
          url += `jobLevel=${jobLevel[i]}&`
        }
      }
    } else {
      url += `jobLevel=${jobLevel}&`
    }
  }

  if (employmentType) {
    if (typeof employmentType !== 'string') {
      for (let i = 0; i < employmentType.length; i++) {
        if (i !== ((employmentType.length) - 1)) {
          url += `employmentType=${employmentType[i]}&`
        } else {
          url += `employmentType=${employmentType[i]}&`
        }
      }
    } else {
      url += `employmentType=${employmentType}&`
    }
  }

  if (salary) {
    url += `salary=${salary}&`
  }

  const res = await axios.get(url)

  return {
    props: {
      data: res.data.jobs
    }
  }
}