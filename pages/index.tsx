import { AiFillCaretDown } from 'react-icons/ai'
import Filter from './../components/home/Filter'
import Navbar from './../components/general/Navbar'
import JobCard from './../components/general/JobCard'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className='mt-12 px-20 flex gap-8'>
        <Filter />
        <div className='flex-[4]'>
          <div className='flex items-center justify-between mb-8'>
            <div className='font-medium text-xl flex items-center gap-4'>
              <h1>Recomended Jobs</h1>
              <p className='text-gray-400'>640</p>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <p>Sort by</p>
              <div className='cursor-pointer flex items-center gap-2'>
                <p className='text-blue-600'>Last posted</p>
                <AiFillCaretDown className='text-gray-400' />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-8 hide-scrollbar'>
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
            <JobCard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home