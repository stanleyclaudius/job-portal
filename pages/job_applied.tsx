import Head from "next/head"
import Footer from "../components/general/Footer"
import Navbar from "../components/general/Navbar"
import JobCard from "../components/jobs/JobCard"

const JobApplied = () => {
  return (
    <>
      <Head>
        <title>Job Seek | Job Applied</title>
      </Head>
      <Navbar />
      <div className='md:py-10 py-6 md:px-16 px-8'>
        <h1 className='text-xl font-medium'>Job Applied</h1>
        <div className='mt-6 grid lg:grid-cols-2 grid-cols-1 md:gap-10 gap-5'>
          <JobCard isApplied={true} />
          <JobCard isApplied={true} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default JobApplied