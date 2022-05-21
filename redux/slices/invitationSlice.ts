import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getDataAPI, patchDataAPI, postDataAPI } from './../../utils/fetchData'
import { IInvitation } from './../types/invitationTypes'

export interface ISendInvitationSlice {
  jobId: string
  userId: string
  token: string
}

export interface IChangeStatusSlice {
  id: string
  status: string
  token: string
}

export const sendInvitation = createAsyncThunk(
  'invitation/send',
  async(data: ISendInvitationSlice, thunkAPI) => {
    try {
      // @ts-ignore
      const state = thunkAPI.getState().invitation
      const res = await postDataAPI('invitation', { jobId: data.jobId, userId: data.userId }, data.token)
  
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          success: res.data.msg
        }
      })

      return [res.data.invitation, ...state]
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

export const getReceivedInvitations = createAsyncThunk(
  'invitation/get',
  async(token: string, thunkAPI) => {
    try {
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          loading: true
        }
      })
  
      const res = await getDataAPI('invitation', token)

      return res.data.invitations
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

export const changeInvitationStatus = createAsyncThunk(
  'invitation/change',
  async(data: IChangeStatusSlice, thunkAPI) => {
    try {
      // @ts-ignore
      const state = thunkAPI.getState().invitation

      const res = await patchDataAPI(`invitation/${data.id}`, { status: data.status }, data.token)
  
      thunkAPI.dispatch({
        type: 'alert/alert',
        payload: {
          success: res.data.msg
        }
      })

      return state.map((item: IInvitation) => item._id === data.id ? { ...item, status: data.status } : item)
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

const initialState: IInvitation[] = []

const invitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        (action) => {
          return action.type.startsWith('invitation/') && action.type.endsWith('/fulfilled')
        },
        (_, action) => {
          return action.payload
        }
      )
  }
})

export default invitationSlice.reducer