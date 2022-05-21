import { createSlice } from '@reduxjs/toolkit'
import { IJobseeker } from '../../utils/Interface'

const initialState: IJobseeker | null = null

interface IAction {
  payload: IJobseeker | null
}

const userDescriptionSlice = createSlice({
  name: 'userDescription',
  initialState,
  reducers: {
    // @ts-ignore
    open: (state: any, action: IAction) => {
      return action.payload
    }
  }
})

export default userDescriptionSlice.reducer