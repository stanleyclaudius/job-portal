import { useState } from 'react'
import Layout from "../../components/admin/Layout"
import OrganizationDetailModal from "../../components/modal/OrganizationDetailModal"

const OrganizationApproval = () => {
  const [openOrganizationDetailModal, setOpenOrganizationDetailModal] = useState(false)

  return (
    <>
      <Layout title='Organization Approval' pageTitle='Organization Approval'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='text-sm bg-[#504ED7] text-white'>
                <th className='p-3'>No</th>
                <th>Organization Name</th>
                <th>Organization Email</th>
                <th>Industry Type</th>
                <th>Created Date</th>
                <th>Registered Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-center bg-[#F9F9FF] text-sm'>
                <td className='p-3'>1</td>
                <td>PT. Lorem Ipsum</td>
                <td>loremipsum@gmail.com</td>
                <td>F&B</td>
                <td>25 Mar 2002</td>
                <td>22 Mar 2022</td>
                <td>
                  <button onClick={() => setOpenOrganizationDetailModal(true)} className='text-xs mr-3 text-white px-3 py-2 bg-blue-500 hover:bg-blue-600 transition-[background] rounded-md'>Detail</button>
                  <button className='bg-green-600 mr-3 hover:bg-green-700 transition-[background] rounded-md text-white px-3 text-xs py-2'>Accept</button>
              <button className='bg-red-500 hover:bg-red-600 transition-[background[ rounded-md text-white px-3 py-2 text-xs'>Reject</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>

      <OrganizationDetailModal
        openModal={openOrganizationDetailModal}
        setOpenModal={setOpenOrganizationDetailModal}
      />
    </>
  )
}

export default OrganizationApproval