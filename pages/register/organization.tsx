import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Editor from './../../utils/Editor'
import Footer from './../../components/general/Footer'
import Navbar from './../../components/general/Navbar'

const Organization = () => {
  const [description, setDescription] = useState('')

  return (
    <>
      <Head>
        <title>Job Seek | Organization Register</title>
      </Head>
      <Navbar />
      <div className='bg-[#FAFAFA] px-10 py-14'>
        <h1 className='text-center mb-10 text-2xl font-semibold text-[#504ED7]'>Recruit Better With Job Seek</h1>
        <div className='bg-white w-full max-w-[1000px] border border-gray-300 m-auto px-8 py-12'>
          <form>
            <div className='flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7'>
              <div className='flex-1'>
                <label htmlFor='name' className='text-sm'>Organization Name</label>
                <input type='text' id='name' name='name' className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
              </div>
              <div className='flex-1'>
                <label htmlFor='email' className='text-sm'>Organization Email</label>
                <input type='text' id='email' name='email' className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
              </div>
            </div>
            <div className='flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7'>
              <div className='flex-1'>
                <label htmlFor='phone' className='text-sm'>Organization Phone Number</label>
                <input type='number' id='phone' name='phone' className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' min={1} />
              </div>
              <div className='flex-1'>
                <label htmlFor='created' className='text-sm'>Organization Created Date</label>
                <input type='date' id='created' name='created' className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
              </div>
            </div>
            <div className='flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7'>
              <div className='flex-1'>
                <label htmlFor='totalEmployee' className='text-sm'>Estimated Organization Total Employee</label>
                <input type='number' id='totalEmployee' name='totalEmployee' className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' min={1} />
              </div>
              <div className='flex-1'>
                <label htmlFor='industry' className='text-sm'>Organization Industry Type (e.g. FnB, Agriculture, etc)</label>
                <input type='text' id='industry' name='industry' className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
              </div>
            </div>
            <div className='flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7'>
              <div className='flex-1'>
                <label htmlFor='province' className='text-sm'>Province</label>
                <select name='province' id='province' className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md bg-transparent'>
                  <option value=''>- Select Province -</option>
                </select>
              </div>
              <div className='flex-1'>
                <label htmlFor='city' className='text-sm'>City</label>
                <select name='city' id='city' className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md bg-transparent'>
                  <option value=''>- Select City -</option>
                </select>
              </div>
            </div>
            <div className='flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7'>
              <div className='flex-1'>
                <label htmlFor='district' className='text-sm'>District</label>
                <select name='district' id='district' className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md bg-transparent'>
                  <option value=''>- Select District -</option>
                </select>
              </div>
              <div className='flex-1'>
                <label htmlFor='postalCode' className='text-sm'>Postal Code</label>
                <input type='number' name='postalCode' id='postalCode' className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
              </div>
            </div>
            <div className='md:mb-10 mb-7'>
              <label htmlFor='address' className='text-sm'>Address</label>
              <input type='text' name='address' id='address' className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
            </div>
            <div className='md:mb-10 mb-7'>
              <label htmlFor='logo' className='text-sm'>Organization Logo</label>
              <div className='flex gap-3 mt-3'>
                <div className='w-16 h-16 rounded-full bg-gray-300 shrink-0'>

                </div>
                <input type='file' id='logo' className='outline-0 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
              </div>
            </div>
            <div className='md:mb-10 mb-7'>
              <label htmlFor='description' className='text-sm'>Organization Description</label>
              <Editor
                content={description}
                setContent={setDescription}
              />
            </div>
            <button className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-sm w-full py-3 text-white rounded-sm'>SIGN UP</button>
          </form>
          <p className='mt-8 text-gray-400 text-sm text-center'>Already have an account? <Link href='/login'><a className='outline-0 text-blue-500'>Sign in</a></Link></p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Organization