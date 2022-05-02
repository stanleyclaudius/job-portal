import Head from 'next/head'
import Footer from './../components/general/Footer'
import Navbar from './../components/general/Navbar'
import UserCard from './../components/general/UserCard'

const Candidates = () => {
  return (
    <>
      <Head>
        <title>Job Seek | Candidates</title>
      </Head>
      <Navbar />
      <div className='md:py-10 py-7 md:px-16 px-5'>
        <form className='flex shadow-xl w-full border border-gray-200 rounded-full h-14 items-center justify-between px-4'>
          <input type='text' placeholder='Job title or keyword' className='w-full outline-0 px-3 rounded-full text-sm' />
          <button className='outline-0 bg-[#504ED7] hover:bg-[#2825C2] transition-[background] px-5 py-2 text-white text-sm rounded-full'>Search</button>
        </form>
      </div>
      <div className='bg-gray-100 pt-10 pb-7 md:px-16 px-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8'>
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
        <UserCard isApplicant={false} />
      </div>
      <Footer />
    </>
  )
}

export default Candidates