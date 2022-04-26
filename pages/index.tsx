import { useState, useEffect, useRef } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { MdFilterAlt } from 'react-icons/md'
import Filter from './../components/home/Filter'
import Navbar from './../components/general/Navbar'
import JobCard from './../components/general/JobCard'
import Footer from './../components/general/Footer'

const Home = () => {
  const [openFilter, setOpenFilter] = useState(false)

  const filterRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openFilter && filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenFilter(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openFilter])

  return (
    <div>
      <Navbar />
      <div className='mt-12 md:px-20 px-6 flex gap-8'>
        <Filter openFilter={openFilter} setOpenFilter={setOpenFilter} filterRef={filterRef} />
        <div className='flex-[4]'>
          <div className='lg:flex items-center justify-between mb-8 block'>
            <div className='flex items-center justify-between mb-3'>
              <div className='font-medium md:text-xl text-lg flex items-center gap-4'>
                <h1>Recomended Jobs</h1>
                <p className='text-gray-400'>640</p>
              </div>
              <button onClick={() => setOpenFilter(!openFilter)} className='lg:hidden block flex items-center gap-2 bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-white px-3 py-2 rounded-md'>
                <MdFilterAlt />
                Filter
              </button>
            </div>
            <div className='items-center gap-2 text-sm flex'>
              <p>Sort by</p>
              <div className='cursor-pointer flex items-center gap-2'>
                <p className='text-blue-600'>Last posted</p>
                <AiFillCaretDown className='text-gray-400' />
              </div>
            </div>
          </div>
          <div className='grid lg:grid-cols-3 md:grid-cols-2 grid=cols-1 gap-8 hide-scrollbar'>
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home