import { IJobseeker } from "../../utils/Interface"

export const GET_APPLICANTS = 'GET_APPLICANTS'
export const CHANGE_APPLICANT_STATUS = 'CHANGE_APPLICANT_STATUS'

export interface IApplicant {
  _id: string
  status: string
  job: string
  jobseeker: IJobseeker
}

export interface IChangeStatus {
  status: string
  job: string
  jobseeker: string
}

export interface IGetApplicantsAction {
  type: typeof GET_APPLICANTS
  payload: IApplicant[]
}

export interface IChangeApplicantStatusAction {
  type: typeof CHANGE_APPLICANT_STATUS
  payload: IChangeStatus
}