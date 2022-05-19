import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Layout from "../components/admin/Layout"
import CreateCategoryModal from '../components/modal/CreateCategoryModal'
import { RootStore } from '../utils/Interface'
import { deleteCategory, getAdminCategory } from '../redux/actions/categoryActions'
import Loader from '../components/general/Loader'
import Pagination from '../components/general/Pagination'
import DeleteModal from '../components/modal/DeleteModal'
import { ICategory } from '../redux/types/categoryTypes'

const Category = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [currPage, setCurrPage] = useState(1)
  const [selectedItem, setSelectedItem] = useState<Partial<ICategory>>({})

  const router = useRouter()
  const dispatch = useDispatch()
  const { alert, auth, adminCategory: category } = useSelector((state: RootStore) => state)

  const handleClickDelete = (item: ICategory) => {
    setSelectedItem(item)
    setOpenDeleteModal(true)
  }

  const handleClickCreate = () => {
    setSelectedItem({})
    setOpenModal(true)
  }

  const handleClickUpdate = (item: ICategory) => {
    setSelectedItem(item)
    setOpenModal(true)
  }

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(`${selectedItem._id}`, `${auth.accessToken}`))
    setOpenDeleteModal(false)
  }

  useEffect(() => {
    if (!auth.accessToken) {
      router.push('/login?r=category')
    } else {
      if (auth.user?.role !== 'admin') {
        router.push('/')
      }
    }
  }, [router, dispatch, auth])

  useEffect(() => {
    if (auth.accessToken) {
      dispatch(getAdminCategory(auth.accessToken, currPage))
    }
  }, [dispatch, auth, currPage])

  return (
    <>
      <Layout title='Job Category'>
        <>
          <div className='mb-8 mt-5 flex items-center justify-between'>
            <h1 className='text-xl font-medium'>Job Category</h1>
            <button onClick={handleClickCreate} className='bg-blue-500 hover:bg-blue-600 transition-[background] text-white px-3 py-2 text-sm rounded-md'>Create Category</button>
          </div>
          {
            alert.loading
            ? <Loader size='xl' />
            : (
              <>
                {
                  category.data.length === 0
                  ? (
                    <div className='bg-red-500 text-white text-center py-3 rounded-md'>There's no category data found.</div>
                  )
                  : (
                    <>
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
                              category.data.map((item, idx) => (
                                <tr className='text-center bg-[#F9F9FF] text-sm'>
                                  <td className='p-3'>{idx + 1}</td>
                                  <td>{item.name}</td>
                                  <td>
                                    <button onClick={() => handleClickUpdate(item)} className='bg-orange-400 hover:bg-orange-500 transition-[background] rounded-md text-white px-2 py-1 text-xs'>Update</button>
                                    <button onClick={() => handleClickDelete(item)} className='bg-red-500 text-white hover:bg-red-600 transiiton-[background] rounded-md px-2 py-1 text-xs ml-5'>Delete</button>
                                  </td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      </div>

                      {
                        category.totalPage > 1 &&
                        <Pagination
                          currPage={currPage}
                          setCurrPage={setCurrPage}
                          totalPage={category.totalPage}
                        />
                      }
                    </>
                  )
                }
              </>
            )
          }
        </>
      </Layout>

      <DeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        text='category'
        onSuccess={handleDeleteCategory}
      />

      <CreateCategoryModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedItem={selectedItem as ICategory}
      />
    </>
  )
}

export default Category