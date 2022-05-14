import { GET_APPLICANTS, IApplicant, IGetApplicantsAction } from "../types/applicantTypes";

const applicantReducer = (state: IApplicant[] = [], action: IGetApplicantsAction) => {
  switch (action.type) {
    case GET_APPLICANTS:
      return action.payload
    default:
      return state
  }
}

export default applicantReducer