import { Dispatch } from 'redux'
import { getDataAPI, postDataAPI } from '../../utils/fetchData'
import { uploadImage } from '../../utils/imageHelper'
import { ALERT, IAlertAction } from '../types/alertTypes'
import { CREATE_CATEGORY, GET_CATEGORY, ICategory, ICreateCategoryAction, IGetCategoryAction } from '../types/categoryTypes'

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