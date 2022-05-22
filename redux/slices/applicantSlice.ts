import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from './../store'
import { getDataAPI, patchDataAPI } from './../../utils/fetchData'
import { IApplicant } from './../../utils/Interface'

interface IGetApplicantType {
  jobId: string
  token: string
}

interface IChangeStatusSlice extends IGetApplicantType {
  jobseeker: string
  status: string
}

export const getApplicants = createAsyncThunk(
  'applicant/get',
  async(data: IGetApplicantType, thunkAPI) => {
    try {
      const res = await getDataAPI(`job/applicant/${data.jobId}`, data.token)
      return res.data.applicants
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

export const changeApplicantStatus = createAsyncThunk(
  'applicant/changeStatus',
  async(data: IChangeStatusSlice, thunkAPI) => {
    try {
      const state = (thunkAPI.getState() as RootState).applicant
      await patchDataAPI(`jobs-applied/status/${data.jobseeker}`, { job: data.jobId, status: data.status }, data.token)

      return state.map((item: IApplicant) => item.job === data.jobId && item.jobseeker._id === data.jobseeker ? { ...item, status: data.status } : item)
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

const initialState: IApplicant[] = []

const applicantSlice = createSlice({
  name: 'applicant',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        (action) => {
          return action.type.startsWith('applicant/') && action.type.endsWith('/fulfilled')
        },
        (_, action) => {
          return action.payload
        }
      )
  }
})

export default applicantSlice.reducer