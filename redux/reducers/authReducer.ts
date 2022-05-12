import { AUTH, IAuthAction, IAuthType } from './../types/authTypes'

const authReducer = (state: IAuthType = {}, action: IAuthAction) => {
  switch (action.type) {
    case AUTH:
      return action.payload
    default:
      return state
  }
}

export default authReducer