import { ALERT, IAlertAction, IAlert } from '../types/alertTypes'

const alertReducer = (state: IAlert = {}, action: IAlertAction) => {
  switch (action.type) {
    case ALERT:
      return action.payload
    default:
      return state
  }
}

export default alertReducer