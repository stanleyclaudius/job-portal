import Head from "next/head"
import Footer from "../components/general/Footer"
import Navbar from "../components/general/Navbar"

const EditProfile = () => {
  return (
    <>
      <Head>
        <title>Job Seek | My Profile</title>
      </Head>
      <Navbar />
      <div className='md:py-14 py-7 md:px-16 px-8 bg-gray-100'>
        <h1 className='text-3xl text-center mb-9 font-medium'><span className='text-[#504ED7]'>Edit</span> Profile</h1>
        <div className='w-full max-w-[700px] bg-white m-auto shadow-lg border border-gray-200 rounded-md p-6'>
          <form>
            <div className='mb-6'>
              <label htmlFor='avatar' className='text-sm'>Avatar</label>
              <div className='flex gap-4 mt-3'>
                <div className='w-20 h-20 bg-gray-200 shrink-0'></div>
                <input type='file' id='avatar' className='w-full outline-0 border border-gray-300 text-sm h-10 rounded-md px-2' />
              </div>
            </div>
            <div className='mb-6'>
              <label htmlFor='name' className='text-sm'>Name</label>
              <input type='text' id='name' name='name' className='outline-0 border border-gray-300 rounded-md h-10 text-sm px-2 w-full mt-3' />
            </div>
            <div className='mb-6'>
              <label htmlFor='email' className='text-sm'>Email</label>
              <input type='text' id='email' name='email' className='outline-0 border border-gray-300 rounded-md h-10 text-sm px-2 w-full mt-3' />
            </div>
            <div className='mb-6'>
              <label htmlFor='dob' className='text-sm'>Date of Birth</label>
              <input type='date' id='dob' name='dob' className='outline-0 border border-gray-300 rounded-md h-10 text-sm px-2 w-full mt-3' />
            </div>
            <div className='mb-6'>
              <div className='flex items-center gap-3'>
                <label htmlFor='cv' className='text-sm'>CV (PDF Format)</label>
                <button className='bg-red-500 text-white text-xs px-2 py-1 rounded-md hover:bg-red-600 transition-[background]'>View CV</button>
              </div>
              <input type='file' id='cv' name='cv' className='outline-0 border border-gray-300 rounded-md h-10 text-sm px-2 w-full mt-3' />
            </div>
            <div className='mb-6 flex md:flex-row flex-col md:items-center md:gap-5 gap-6'>
              <div className='flex-1'>
                <label htmlFor='province' className='text-sm'>Province</label>
                <select name='province' id='province' className='w-full outline-0 bg-transparent border border-gray-300 rounded-md h-10 px-2 mt-3 text-sm'>
                  <option value=''>- Select Province -</option>
                </select>
              </div>
              <div className='flex-1'>
                <label htmlFor='district' className='text-sm'>District</label>
                <select name='district' id='district' className='w-full outline-0 bg-transparent border border-gray-300 rounded-md h-10 px-2 mt-3 text-sm'>
                  <option value=''>- Select District -</option>
                </select>
              </div>
            </div>
            <div className='mb-9 flex md:flex-row flex-col md:items-center md:gap-5 gap-6'>
              <div className='flex-1'>
                <label htmlFor='district' className='text-sm'>District</label>
                <select name='district' id='district' className='w-full outline-0 bg-transparent border border-gray-300 rounded-md h-10 px-2 mt-3 text-sm'>
                  <option value=''>- Select District -</option>
                </select>
              </div>
              <div className='flex-1'>
                <label htmlFor='postalCode' className='text-sm'>Postal Code</label>
                <input type='number' name='postalCode' id='postalCode' className='w-full outline-0 bg-transparent border border-gray-300 rounded-md h-10 px-2 mt-3 text-sm' min={1} />
              </div>
            </div>
            <button className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-sm w-full py-3 text-white rounded-sm'>Save Changes</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default EditProfile