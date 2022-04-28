import Head from "next/head"
import Footer from "../components/general/Footer"
import Navbar from "../components/general/Navbar"
import Filter from "../components/jobs/Filter"
import JobCard from "../components/jobs/JobCard"
import JobDetail from "../components/jobs/JobDetail"

const Jobs = () => {
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
      <Filter />
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