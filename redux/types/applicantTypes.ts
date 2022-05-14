import { IJobseeker } from "../../utils/Interface"

export const GET_APPLICANTS = 'GET_APPLICANTS'

export interface IApplicant {
  _id: string
  status: string
  jobseeker: IJobseeker
}

export interface IGetApplicantsAction {
  type: typeof GET_APPLICANTS
  payload: IApplicant[]
}