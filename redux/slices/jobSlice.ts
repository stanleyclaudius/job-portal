import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './../store'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData'
import { IJob, IJobState } from './../../utils/Interface'

interface IGetJobType {
  token: string
  page: number
}

interface ICreateJobType extends IJob {
  token: string
}

interface IDeleteJobType {
  id: string
  token: string
}

interface IUpdateJobType extends IDeleteJobType, IJob {}

export const getJobPosition = createAsyncThunk(
  'job/position',
  async(token: string, thunkAPI) => {
    try {
      const res = await getDataAPI('job/position', token)
      return {
        data: res.data.position,
        page: 1
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

export const getJobs = createAsyncThunk(
  'job/get',
  async(data: IGetJobType, thunkAPI) => {
    try {
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: { loading: true }
      })

      const res = await getDataAPI(`job?page=${data.page}`, data.token)

      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {}
      })

      return {
        data: res.data.jobs,
        totalPage: res.data.totalPage
      }
    } catch (err: any) {
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: { error: err.response.data.msg }
      })
    }
  }
)

export const createJob = createAsyncThunk(
  'job/create',
  async(jobData: ICreateJobType, thunkAPI) => {
    try {
      const state = (thunkAPI.getState() as RootState).job
      const res = await postDataAPI('job', jobData, jobData.token)
  
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          success: res.data.msg
        }
      })

      return {
        ...state,
        data: [res.data.job, ...state.data]
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

export const deleteJob = createAsyncThunk(
  'job/delete',
  async(data: IDeleteJobType, thunkAPI) => {
    try {
      const state = (thunkAPI.getState() as RootState).job
      const res = await deleteDataAPI(`job/${data.id}`, data.token)
  
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          success: res.data.msg
        }
      })

      return {
        ...state,
        data: state.data.filter((item: IJob) => item._id !== data.id)
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

export const updateJob = createAsyncThunk(
  'job/update',
  async(data: IUpdateJobType, thunkAPI) => {
    try {
      const state = (thunkAPI.getState() as RootState).job
      const res = await patchDataAPI(`job/${data.id}`, data, data.token)
  
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          success: res.data.msg
        }
      })

      return {
        ...state,
        data: state.data.map((item: IJob) => item._id === res.data.job._id ? res.data.job : item)
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

const initialState: IJobState = {
  data: [],
  totalPage: 0
}

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        (action) => {
          return action.type.startsWith('job/') && action.type.endsWith('/fulfilled')
        },
        (_, action) => {
          return action.payload
        }
      )
  }
})

export default jobSlice.reducer