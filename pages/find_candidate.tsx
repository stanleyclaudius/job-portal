import Head from "next/head"
import { BsBuilding } from "react-icons/bs"
import Footer from "../components/general/Footer"
import Navbar from "../components/general/Navbar"

const FindCandidate = () => {
  return (
    <>
      <Head>
        <title>Job Seek | Find Candidate</title>
      </Head>
      <Navbar />
      <div className='pb-20 pt-14 px-10 md:px-0'>
        <h1 style={{ lineHeight: '70px' }} className='md:text-5xl text-3xl text-center font-medium mb-7'>Find The <span className='text-[#504ED7]'>Right Candidate</span> <br className='hidden md:block' /> You Deserve</h1>
        <p className='text-gray-400 text-sm text-center'>1,850,750 candidate listed here! Your dream candidate is waiting</p>
        <div className='w-full max-w-[800px] m-auto bg-white shadow-xl border border-gray-200 md:rounded-full rounded-md md:h-16 h-auto md:py-0 py-6 px-4 mt-12'>
          <form className='flex md:flex-row flex-col justify-between items-center h-full gap-3'>
            <div className='flex w-full items-center gap-3 md:mb-0 mb-4 md:border-none border-b border-gray-200 md:pb-0 pb-3 flex-1'>
              <BsBuilding className='text-xl text-gray-500' />
              <input type='text' placeholder='Frontend Engineer' className='outline-0 h-full w-full text-sm px-2' />
            </div>
            <button className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-white text-sm px-6 py-2 rounded-full outline-0'>Search</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export  default FindCandidate