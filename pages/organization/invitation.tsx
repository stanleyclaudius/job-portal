import { useState } from 'react'
import Head from 'next/head'
import Footer from './../../components/general/Footer'
import Navbar from './../../components/general/Navbar'
import UserDescriptionModal from './../../components/modal/UserDescriptionModal'

const SentInvitation = () => {
  const [openUserDescriptionModal, setOpenUserDescriptionModal] = useState(false)

  return (
    <>
      <Head>
        <title>Job Seek | Sent Invitation</title>
      </Head>
      <Navbar />
      <div className='md:py-10 py-7 md:px-16 px-8'>
        <h1 className='font-medium text-2xl'>Sent Invitation</h1>
        <div className='overflow-x-auto mt-8'>
          <table className='w-full'>
            <thead>
              <tr className='text-sm bg-[#504ED7] text-white'>
                <th className='p-3'>No</th>
                <th>User</th>
                <th>Position</th>
                <th>Sent Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-center bg-[#F9F9FF] text-sm'>
                <td className='p-3'>1</td>
                <td>User 1</td>
                <td>Frontend Engineer</td>
                <td>25 Mar 2022</td>
                <td>
                  <p className='bg-orange-500 w-fit text-white m-auto px-3 py-1 text-xs rounded-md'>Pending</p>
                </td>
                <td>
                  <button onClick={() => setOpenUserDescriptionModal(true)} className='bg-blue-500 hover:bg-blue-600 rounded-md text-white px-3 py-1 transition-[background]'>Detail</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

      <UserDescriptionModal
        openModal={openUserDescriptionModal}
        setOpenModal={setOpenUserDescriptionModal}
      />
    </>
  )
}

export default SentInvitation