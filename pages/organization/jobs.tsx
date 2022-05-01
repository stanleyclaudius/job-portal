import { useState } from 'react'
import Head from "next/head"
import Footer from "../../components/general/Footer"
import Navbar from "../../components/general/Navbar"
import JobDetailModal from './../../components/modal/JobDetailModal'
import DeleteModal from '../../components/modal/DeleteModal'
import ApplicantModal from '../../components/modal/ApplicantModal'
import CreateJobModal from '../../components/modal/CreateJobModal'

const OrganizationJobs = () => {
  const [openJobDetailModal, setOpenJobDetailModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openApplicantModal, setOpenApplicantModal] = useState(false)
  const [openCreateJobModal, setOpenCreateJobModal] = useState(false)

  return (
    <>
      <Head>
        <title>Job Seek | Job Management</title>
      </Head>
      <Navbar />
      <div className='md:py-10 py-7 md:px-16 px-8'>
        <div className='flex items-center justify-between'>
          <h1 className='md:text-2xl text-lg font-medium'>Job Management</h1>
          <button onClick={() => setOpenCreateJobModal(true)} className='bg-blue-500 hover:bg-blue-600 transition-[background] text-white text-sm rounded-md px-4 py-2'>Create Job</button>
        </div>
        <div className='overflow-x-auto mt-8'>
          <table className='w-full'>
            <thead>
              <tr className='text-sm bg-[#504ED7] text-white'>
                <th className='p-3'>No</th>
                <th>Position</th>
                <th>Posted Date</th>
                <th>Total Applicant</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-center bg-[#F9F9FF] text-sm'>
                <td className='p-3'>1</td>
                <td>Frontend Engineer</td>
                <td>25 Mar 2022</td>
                <td>25</td>
                <td>
                  <button onClick={() => setOpenJobDetailModal(true)} className='mr-3 bg-blue-500 hover:bg-blue-600 transition-[background] text-white text-xs px-3 py-1 rounded-md'>Detail</button>
                  <button onClick={() => setOpenApplicantModal(true)} className='mr-3 bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-white text-xs px-3 py-1 rounded-md'>Applicant</button>
                  <button className='mr-3 bg-orange-500 hover:bg-orange-600 transition-[background] text-white text-xs px-3 py-1 rounded-md'>Edit</button>
                  <button onClick={() => setOpenDeleteModal(true)} className='mr-3 bg-red-500 hover:bg-red-600 transition-[background] text-white text-xs px-3 py-1 rounded-md'>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

      <JobDetailModal
        openModal={openJobDetailModal}
        setOpenModal={setOpenJobDetailModal}
      />

      <DeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        text='job'
      />

      <ApplicantModal
        openModal={openApplicantModal}
        setOpenModal={setOpenApplicantModal}
      />

      <CreateJobModal
        openModal={openCreateJobModal}
        setOpenModal={setOpenCreateJobModal}
      />
    </>
  )
}

export default OrganizationJobs