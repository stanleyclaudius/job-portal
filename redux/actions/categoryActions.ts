import { Dispatch } from 'redux'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { uploadImage } from '../../utils/imageHelper'
import { ALERT, IAlertAction } from '../types/alertTypes'
import { CREATE_CATEGORY, DELETE_CATEGORY, GET_ADMIN_CATEGORY, GET_CATEGORY, ICategory, ICreateCategoryAction, IDeleteCategoryAction, IGetAdminCategoryAction, IGetCategoryAction, IUpdateCategoryAction, UPDATE_CATEGORY } from '../types/categoryTypes'

export const getAdminCategory = (token: string, page: number = 1) => async(dispatch: Dispatch<IGetAdminCategoryAction | IAlertAction>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI(`category/admin?page=${page}`, token)
    dispatch({
      type: GET_ADMIN_CATEGORY,
      payload: {
        data: res.data.categories,
        totalPage: res.data.totalPage
      }
    })

    dispatch({
      type: ALERT,
      payload: {}
    })
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}

export const getCategory = (token: string) => async(dispatch: Dispatch<IGetCategoryAction | IAlertAction>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('category', token)
    dispatch({
      type: GET_CATEGORY,
      payload: res.data.categories
    })

    dispatch({
      type: ALERT,
      payload: {}
    })
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}

export const createCategory = (categoryData: ICategory, token: string) => async(dispatch: Dispatch<ICreateCategoryAction | IAlertAction>) => {
  try {
    let imgUrl = await uploadImage(categoryData.image as File[], 'category')

    const res = await postDataAPI('category', { ...categoryData, image: imgUrl[0] }, token)
    dispatch({
      type: CREATE_CATEGORY,
      payload: res.data.category
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}

export const updateCategory = (categoryData: ICategory, prevImg: string, token: string) => async(dispatch: Dispatch<IUpdateCategoryAction | IAlertAction>) => {
  try {
    let newImgUrl

    if (typeof categoryData.image !== 'string') {
      if (categoryData.image.length > 0) {
        newImgUrl = await uploadImage(categoryData.image, 'category')
      }
    }

    console.log(categoryData)

    const res = await patchDataAPI(`category/${categoryData._id}`, { ...categoryData, image: newImgUrl ? newImgUrl[0] : prevImg }, token)
    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data.category
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}

export const deleteCategory = (id: string, token: string) => async(dispatch: Dispatch<IDeleteCategoryAction | IAlertAction>) => {
  try {
    const res = await deleteDataAPI(`category/${id}`, token)
    dispatch({
      type: DELETE_CATEGORY,
      payload: id
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}