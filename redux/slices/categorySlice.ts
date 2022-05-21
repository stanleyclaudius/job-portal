import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDataAPI } from '../../utils/fetchData'
import { ICategory } from '../types/categoryTypes'

export const getCategory = createAsyncThunk(
  'category/get',
  async(token: string, thunkAPI) => {
    try {
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          loading: true
        }
      })
  
      const res = await getDataAPI('category', token)
  
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {}
      })

      return res.data.categories
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

const initialState: ICategory[] = []

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        (action) => {
          return action.type.startsWith('auth/') && action.type.endsWith('/fulfilled')
        },
        (_, action) => {
          return action.payload
        }
      )
  }
})

export default categorySlice.reducer