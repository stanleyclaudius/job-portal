import { CHANGE_APPLICANT_STATUS, GET_APPLICANTS, IApplicant, IChangeApplicantStatusAction, IGetApplicantsAction } from "../types/applicantTypes";

const applicantReducer = (state: IApplicant[] = [], action: IGetApplicantsAction | IChangeApplicantStatusAction) => {
  switch (action.type) {
    case GET_APPLICANTS:
      return action.payload
    case CHANGE_APPLICANT_STATUS:
      return state.map(item => item.job === action.payload.job && item.jobseeker._id === action.payload.jobseeker ? { ...item, status: action.payload.status } : item)
    default:
      return state
  }
}

export default applicantReducer