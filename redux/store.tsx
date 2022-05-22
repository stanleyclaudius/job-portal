import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/authSlice'
import alert from './slices/alertSlice'
import job from './slices/jobSlice'
import applicant from './slices/applicantSlice'
import invitation from './slices/invitationSlice'
import category from './slices/categorySlice'
import userDescription from './slices/userDescriptionSlice'
import organization from './slices/organizationSlice'

const store = configureStore({
  reducer: {
    auth,
    alert,
    job,
    applicant,
    invitation,
    category,
    userDescription,
    organization
  }
})

interface IProps {
  children: ReactNode
}

const DataProvider = ({ children }: IProps) => {
  return (
    <Provider store={store}>
      {children}
    </Provider> 
  )
}

export default DataProvider

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>