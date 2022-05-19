import { CHANGE_ORGANIZATION_STATUS, GET_UNAPPROVED_ORGANIZATIONS, IChangeOrganizationStatusAction, IGetUnapprovedOrganizationsAction, IOrganization, IOrganizationType } from './../types/organizationTypes'

const initialState = {
  data: [],
  totalPage: 0
}

const organizationReducer = (state: IOrganizationType = initialState, action: IGetUnapprovedOrganizationsAction | IChangeOrganizationStatusAction) =>{
  switch (action.type) {
    case GET_UNAPPROVED_ORGANIZATIONS:
      return action.payload
    case CHANGE_ORGANIZATION_STATUS:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload)
      }
    default:
      return state
  }
}

export default organizationReducer