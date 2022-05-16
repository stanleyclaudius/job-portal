import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from "../components/admin/Layout"
import CreateCategoryModal from '../components/modal/CreateCategoryModal'
import { RootStore } from '../utils/Interface'
import { getCategory } from '../redux/actions/categoryActions'
import Loader from '../components/general/Loader'

const Category = () => {
  const [openModal, setOpenModal] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()
  const { alert, auth, category } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if (!auth.accessToken) {
      router.push('/login?r=category')
    } else {
      if (auth.user?.role !== 'admin') {
        router.push('/')
      } else {
        dispatch(getCategory(auth.accessToken))
      }
    }
  }, [router, dispatch, auth])

  return (
    <>
      <Layout title='Job Category'>
        <>
          <div className='mb-8 mt-5 flex items-center justify-between'>
            <h1 className='text-xl font-medium'>Job Category</h1>
            <button onClick={() => setOpenModal(true)} className='bg-blue-500 hover:bg-blue-600 transition-[background] text-white px-3 py-2 text-sm rounded-md'>Create Category</button>
          </div>
          {
            alert.loading
            ? <Loader size='xl' />
            : (
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='text-sm bg-[#504ED7] text-white'>
                      <th className='p-3'>No</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      category.map((item, idx) => (
                        <tr className='text-center bg-[#F9F9FF] text-sm'>
                          <td className='p-3'>{idx + 1}</td>
                          <td>{item.name}</td>
                          <td>
                            <button className='bg-orange-400 hover:bg-orange-500 transition-[background] rounded-md text-white px-2 py-1 text-xs'>Update</button>
                            <button className='bg-red-500 text-white hover:bg-red-600 transiiton-[background] rounded-md px-2 py-1 text-xs ml-5'>Delete</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )
          }
        </>
      </Layout>

      <CreateCategoryModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  )
}

export default Category