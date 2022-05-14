import { AUTH, IAuthAction, IAuth } from './../types/authTypes'

const authReducer = (state: IAuth = {}, action: IAuthAction) => {
  switch (action.type) {
    case AUTH:
      return action.payload
    default:
      return state
  }
}

export default authReducer