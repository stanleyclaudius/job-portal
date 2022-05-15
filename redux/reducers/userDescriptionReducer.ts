import { IJobseeker } from './../../utils/Interface'
import { IOpenDescriptionActions, OPEN_DESCRIPTION_MODAL } from './../types/userDescriptionTypes'

const userDescriptionReducer = (state: IJobseeker | null = null, action: IOpenDescriptionActions) => {
  switch (action.type) {
    case OPEN_DESCRIPTION_MODAL:
      return action.payload
    default:
      return state
  }
}

export default userDescriptionReducer