import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getJobs, deleteJob } from './../../redux/slices/jobSlice'
import { AppDispatch, RootState } from './../../redux/store'
import { IJob } from './../../utils/Interface'
import Head from 'next/head'
import Footer from './../../components/general/Footer'
import Navbar from './../../components/general/Navbar'
import JobDetailModal from './../../components/modal/JobDetailModal'
import DeleteModal from './../../components/modal/DeleteModal'
import ApplicantModal from './../../components/modal/ApplicantModal'
import CreateJobModal from './../../components/modal/CreateJobModal'
import Loader from './../../components/general/Loader'
import Pagination from './../../components/general/Pagination'

const OrganizationJobs = () => {
  const [openJobDetailModal, setOpenJobDetailModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openApplicantModal, setOpenApplicantModal] = useState(false)
  const [openCreateJobModal, setOpenCreateJobModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Partial<IJob>>({})
  const [currPage, setCurrPage] = useState(1)

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { alert, auth, job } = useSelector((state: RootState) => state)

  const handleClickApplicant = (item: IJob) => {
    setOpenApplicantModal(true)
    setSelectedItem(item)
  }

  const handleClickDetail = (item: IJob) => {
    setOpenJobDetailModal(true)
    setSelectedItem(item)
  }

  const handleClickDelete = (item: IJob) => {
    setOpenDeleteModal(true)
    setSelectedItem(item)
  }

  const handleClickEdit = (item: IJob) => {
    setSelectedItem(item)
    setOpenCreateJobModal(true)
  }

  const handleDeleteJob = () => {
    dispatch(deleteJob({ id: `${selectedItem._id}`, token: `${auth.accessToken}` }))
    setOpenDeleteModal(false)
  }

  const handleClickCreateJob = () => {
    setSelectedItem({})
    setOpenCreateJobModal(true)
  }

  useEffect(() => {
    if (!auth.accessToken) {
      router.push('/login?r=organization/jobs')
    } else {
      if (auth.user?.role !== 'organization') {
        router.push('/')
      }
    }
  }, [router, dispatch, auth])

  useEffect(() => {
    if (auth.accessToken)
      dispatch(getJobs({ token: auth.accessToken, page: currPage }))
  }, [auth, currPage, dispatch])

  return (
    <>
      <Head>
        <title>Job Seek | Job Management</title>
      </Head>
      <Navbar />
      <div className='md:py-10 py-7 md:px-16 px-8'>
        <div className='flex items-center justify-between'>
          <h1 className='md:text-2xl text-lg font-medium'>Job Management</h1>
          <button onClick={handleClickCreateJob} className='bg-blue-500 hover:bg-blue-600 transition-[background] text-white text-sm rounded-md px-4 py-2'>Create Job</button>
        </div>
        {
          alert.loading
          ? <Loader size='xl' />
          : (
            <>
              {
                job.data.length === 0
                ? (
                  <div className='bg-red-500 text-center mt-8 text-white text-sm rounded-md py-3'>There's no job posted data found.</div>
                )
                : (
                  <>
                    <div className='overflow-x-auto mt-8'>
                      <table className='w-full'>
                        <thead>
                          <tr className='text-sm bg-[#504ED7] text-white'>
                            <th className='p-3'>No</th>
                            <th>Position</th>
                            <th>Job Level</th>
                            <th>Employment Type</th>
                            <th>Posted Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            job.data.map((item, idx) => (
                              <tr key={item._id} className='text-center bg-[#F9F9FF] text-sm'>
                                <td className='p-3'>{idx + 1}</td>
                                <td>{item.position}</td>
                                <td>{item.jobLevel}</td>
                                <td>{item.employmentType}</td>
                                <td>{`${new Date(item.createdAt!).toLocaleDateString()}`}</td>
                                <td>
                                  <button onClick={() => handleClickDetail(item)} className='mr-3 bg-blue-500 hover:bg-blue-600 transition-[background] text-white text-xs px-3 py-1 rounded-md'>Detail</button>
                                  <button onClick={() => handleClickApplicant(item)} className='mr-3 bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-white text-xs px-3 py-1 rounded-md'>Applicant</button>
                                  <button onClick={() => handleClickEdit(item)} className='mr-3 bg-orange-500 hover:bg-orange-600 transition-[background] text-white text-xs px-3 py-1 rounded-md'>Edit</button>
                                  <button onClick={() => handleClickDelete(item)} className='mr-3 bg-red-500 hover:bg-red-600 transition-[background] text-white text-xs px-3 py-1 rounded-md'>Delete</button>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                    {
                      job.totalPage > 1 &&
                      <Pagination
                        totalPage={job.totalPage}
                        currPage={currPage}
                        setCurrPage={setCurrPage}
                      />
                    }
                  </>
                )
              }
            </>
          )
        }
      </div>
      <Footer />

      {
        (selectedItem && openJobDetailModal) &&
        <JobDetailModal
          openModal={openJobDetailModal}
          setOpenModal={setOpenJobDetailModal}
          jobDetail={selectedItem as IJob}
        />
      }

      <DeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        text='job'
        onSuccess={handleDeleteJob}
      />
      
      <ApplicantModal
        openModal={openApplicantModal}
        setOpenModal={setOpenApplicantModal}
        jobId={selectedItem._id as string}
      />

      <CreateJobModal
        openModal={openCreateJobModal}
        setOpenModal={setOpenCreateJobModal}
        selectedItem={selectedItem as IJob}
      />
    </>
  )
}

export default OrganizationJobs