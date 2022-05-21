import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData'
import { uploadImage } from './../../utils/imageHelper'
import { IAdminCategory, ICategory } from './../types/categoryTypes'

interface IGetSlice {
  token: string
  page: number
}

interface ICreateSlice extends ICategory {
  token: string
}

interface IUpdateSlice extends ICreateSlice {
  prevImg: string
}

interface IDeleteSlice {
  id: string
  token: string
}

export const getAdminCategory = createAsyncThunk(
  'adminCategory/get',
  async(data: IGetSlice, thunkAPI) => {
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
  'adminCategory/create',
  async(data: ICreateSlice, thunkAPI) => {
    try {
      // @ts-ignore
      const state = thunkAPI.getState().adminCategory
      let imgUrl = await uploadImage(data.image as File[], 'category')
  
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
  'adminCategory/update',
  async(data: IUpdateSlice, thunkAPI) => {
    try {
      // @ts-ignore
      const state = thunkAPI.getState().adminCategory
      
      let newImgUrl
  
      if (typeof data.image !== 'string') {
        if (data.image.length > 0) {
          newImgUrl = await uploadImage(data.image, 'category')
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
  'adminCategory/delete',
  async(data: IDeleteSlice, thunkAPI) => {
    try {
      // @ts-ignore
      const state = thunkAPI.getState().adminCategory

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

const initialState: IAdminCategory = {
  data: [],
  totalPage: 0
}

const adminCategorySlice = createSlice({
  name: 'adminCategory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        (action) => {
          return action.type.startsWith('adminCategory/') && action.type.endsWith('/fulfilled')
        },
        (_, action) => {
          return action.payload
        }
      )
  }
})

export default adminCategorySlice.reducer