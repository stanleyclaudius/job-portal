import { createSlice } from '@reduxjs/toolkit'
import { IAlert } from './../../utils/Interface'

const initialState: IAlert = {}

interface IAlertAction {
  payload: IAlert
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    alert: (state: IAlert, action: IAlertAction) => {
      return action.payload
    }
  }
})

export default alertSlice.reducer