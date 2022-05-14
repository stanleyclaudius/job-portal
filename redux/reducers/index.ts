import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import organization from './organizationReducer'
import job from './jobReducer'

export default combineReducers({
  auth,
  alert,
  organization,
  job
})