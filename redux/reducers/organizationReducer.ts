import { ACCEPT_ORGANIZATION, GET_UNAPPROVED_ORGANIZATIONS, IAcceptOrganizationAction, IUnapprovedOrganizationsAction, IUnapprovedOrganizationsType } from './../types/organizationTypes'

const organizationReducer = (state: IUnapprovedOrganizationsType[] = [], action: IUnapprovedOrganizationsAction | IAcceptOrganizationAction) =>{
  switch (action.type) {
    case GET_UNAPPROVED_ORGANIZATIONS:
      return action.payload
    case ACCEPT_ORGANIZATION:
      return state.filter(item => item._id !== action.payload)
    default:
      return state
  }
}

export default organizationReducer