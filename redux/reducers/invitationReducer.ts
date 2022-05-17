import { CHANGE_INVITATION_STATUS, GET_RECEIVED_INVITATION, IChangeInvitationStatusAction, IGetInvitationAction, IInvitation, ISendInvitationAction, SEND_INVITATION } from "../types/invitationTypes";

const invitationReducer = (state: IInvitation[] = [], action: ISendInvitationAction | IGetInvitationAction | IChangeInvitationStatusAction) => {
  switch (action.type) {
    case SEND_INVITATION:
      return [action.payload, ...state]
    case GET_RECEIVED_INVITATION:
      return action.payload
    case CHANGE_INVITATION_STATUS:
      return state.map(item => item._id === action.payload.id ? { ...item, status: action.payload.status } : item)
    default:
      return state
  }
}

export default invitationReducer