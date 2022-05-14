export const GET_JOBS = 'GET_JOBS'
export const CREATE_JOB = 'CREATE_JOB'

export interface IJob {
  _id?: string
  organization?: string
  position: string
  skills: string[]
  salary: number
  overview: string
  requirements: string
  keywords: string[]
  createdAt?: string
  applicants?: any[]
}

export interface IGetJobsAction {
  type: typeof GET_JOBS
  payload: IJob[]
}

export interface ICreateJobAction {
  type: typeof CREATE_JOB
  payload: IJob
}