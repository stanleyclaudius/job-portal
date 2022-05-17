import { GET_RECEIVED_INVITATION, IGetInvitationAction, IInvitation, ISendInvitationAction, SEND_INVITATION } from "../types/invitationTypes";

const invitationReducer = (state: IInvitation[] = [], action: ISendInvitationAction | IGetInvitationAction) => {
  switch (action.type) {
    case SEND_INVITATION:
      return [action.payload, ...state]
    case GET_RECEIVED_INVITATION:
      return action.payload
    default:
      return state
  }
}

export default invitationReducer