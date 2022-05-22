import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { uploadFile } from '../../utils/uploadHelper'
import { ICategoryState, ICategory } from '../../utils/Interface'

interface IGetCategoryType {
  token: string
  page: number
}

interface ICreateCategoryType extends ICategory {
  token: string
}

interface IUpdateCategoryType extends ICreateCategoryType {
  prevImg: string
}

interface IDeleteCategoryType {
  id: string
  token: string
}

export const getCategory = createAsyncThunk(
  'category/get',
  async(data: IGetCategoryType, thunkAPI) => {
    try {
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          loading: true
        }
      })
  
      const res = await getDataAPI(`category/admin?page=${data.page}`, data.token)
  
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {}
      })

      return {
        data: res.data.categories,
        totalPage: res.data.totalPage
      }
    } catch (err: any) {
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          error: err.response.data.msg
        }
      })
    }
  }
)

export const createCategory = createAsyncThunk(
  'category/create',
  async(data: ICreateCategoryType, thunkAPI) => {
    try {
      const state = (thunkAPI.getState() as RootState).category
      let imgUrl = await uploadFile(data.image as File[], 'category')
  
      const res = await postDataAPI('category', { ...data, image: imgUrl[0] }, data.token)
  
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          success: res.data.msg
        }
      })

      return {
        ...state,
        data: [res.data.category, ...state.data]
      }
    } catch (err: any) {
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          error: err.response.data.msg
        }
      })
    }
  }
)

export const updateCategory = createAsyncThunk(
  'category/update',
  async(data: IUpdateCategoryType, thunkAPI) => {
    try {
      const state = (thunkAPI.getState() as RootState).category
      
      let newImgUrl
  
      if (typeof data.image !== 'string') {
        if (data.image.length > 0) {
          newImgUrl = await uploadFile(data.image, 'category')
        }
      }
  
      const res = await patchDataAPI(`category/${data._id}`, { ...data, image: newImgUrl ? newImgUrl[0] : data.prevImg }, data.token)
  
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          success: res.data.msg
        }
      })

      return {
        ...state,
        data: state.data.map((item: ICategory) => item._id === res.data.category._id ? res.data.category : item)
      }
    } catch (err: any) {
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          error: err.response.data.msg
        }
      })
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async(data: IDeleteCategoryType, thunkAPI) => {
    try {
      const state = (thunkAPI.getState() as RootState).category

      const res = await deleteDataAPI(`category/${data.id}`, data.token)
  
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          success: res.data.msg
        }
      })

      return {
        ...state,
        data: state.data.filter((item: ICategory) => item._id !== data.id)
      }
    } catch (err: any) {
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          error: err.response.data.msg
        }
      })
    }
  }
)

const initialState: ICategoryState = {
  data: [],
  totalPage: 0
}

const category = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        (action) => {
          return action.type.startsWith('category/') && action.type.endsWith('/fulfilled')
        },
        (_, action) => {
          return action.payload
        }
      )
  }
})

export default category.reducer