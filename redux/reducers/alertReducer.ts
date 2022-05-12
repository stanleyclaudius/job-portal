import { ALERT, IAlertAction, IAlertType } from "../types/alertTypes";

const alertReducer = (state: IAlertType = {}, action: IAlertAction) => {
  switch (action.type) {
    case ALERT:
      return action.payload
    default:
      return state
  }
}

export default alertReducer