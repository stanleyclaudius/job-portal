import { GET_UNAPPROVED_ORGANIZATIONS, IUnapprovedOrganizationsAction, IUnapprovedOrganizationsType } from './../types/organizationTypes'

const organizationReducer = (state: IUnapprovedOrganizationsType[] = [], action: IUnapprovedOrganizationsAction) =>{
  switch (action.type) {
    case GET_UNAPPROVED_ORGANIZATIONS:
      return action.payload
    default:
      return state
  }
}

export default organizationReducer