import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './../store'
import { deleteDataAPI, getDataAPI, patchDataAPI } from './../../utils/fetchData'
import { IOrganization, IOrganizationType } from './../types/organizationTypes'

interface IGetSlice {
  token: string
  page: number
}

interface IStatusSlice {
  id: string
  token: string
}

export const getUnapprovedOrganizations = createAsyncThunk(
  'organization/getUnapproved',
  async(data: IGetSlice, thunkAPI) => {
    try {
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          loading: true
        }
      })
  
      const res = await getDataAPI(`organization/unapproved?page=${data.page}`, data.token)
  
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {}
      })

      return {
        data: res.data.organizations,
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

export const acceptOrganization = createAsyncThunk(
  'organization/accept',
  async(data: IStatusSlice, thunkAPI) => {
    try {
      const state = (thunkAPI.getState() as RootState).organization

      const res = await patchDataAPI(`organization/accept/${data.id}`, {}, data.token)
  
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          success: res.data.msg
        }
      })

      return {
        ...state,
        data: state.data.filter((item: IOrganization) => item._id !== data.id)
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

export const rejectOrganization = createAsyncThunk(
  'organization/reject',
  async(data: IStatusSlice, thunkAPI) => {
    try {
      const state = (thunkAPI.getState() as RootState).organization

      const res = await deleteDataAPI(`organization/reject/${data.id}`, data.token)
  
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          success: res.data.msg
        }
      })

      return {
        ...state,
        data: state.data.filter((item: IOrganization) => item._id !== data.id)
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

const initialState: IOrganizationType = {
  data: [],
  totalPage: 0
}

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        (action) => {
          return action.type.startsWith('organization/') && action.type.endsWith('/fulfilled')
        },
        (_, action) => {
          return action.payload
        }
      )
  }
})

export default organizationSlice.reducer