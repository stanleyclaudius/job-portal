import { AiOutlineSearch } from 'react-icons/ai'
import { IoLocation } from 'react-icons/io5'

const Jumbotron = () => {
  return (
    <div className='pb-20 pt-14 px-10 md:px-0'>
      <h1 style={{ lineHeight: '70px' }} className='md:text-5xl text-3xl text-center font-medium mb-7'>Get The <span className='text-[#504ED7]'>Right Job</span> <br className='hidden md:block' /> You Deserve</h1>
      <p className='text-gray-400 text-sm text-center'>1,850,750 jobs listed here! Your dream job is waiting</p>
      <div className='w-full max-w-[800px] m-auto bg-white shadow-xl border border-gray-200 md:rounded-full rounded-md md:h-16 h-auto md:py-0 py-6 px-4 mt-12'>
        <form className='flex md:flex-row flex-col justify-between items-center h-full gap-3'>
          <div className='flex w-full items-center gap-3 md:mb-0 mb-5 md:border-none border-b border-gray-200 md:pb-0 pb-3 flex-1'>
            <AiOutlineSearch className='text-xl text-gray-500' />
            <input type='text' placeholder='Job title or keyword' className='outline-0 h-full px-2 w-full text-sm' />
          </div>
          <div className='w-[1px] h-10 bg-gray-200 md:block hidden' />
          <div className='flex w-full items-center gap-3 md:mb-0 mb-4 md:border-none border-b border-gray-200 md:pb-0 pb-3 flex-1'>
            <IoLocation className='text-xl text-gray-500' />
            <input type='text' placeholder='Jawa Tengah' className='outline-0 h-full w-full text-sm px-2' />
          </div>
          <button className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-white text-sm px-6 py-2 rounded-full outline-0'>Search</button>
        </form>
      </div>
    </div>
  )
}

export default Jumbotron