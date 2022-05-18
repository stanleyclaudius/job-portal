import { IOrganization } from './organizationTypes'

export const GET_JOBS = 'GET_JOBS'
export const CREATE_JOB = 'CREATE_JOB'
export const DELETE_JOB = 'DELETE_JOB'
export const UPDATE_JOB = 'UPDATE_JOB'

export interface IJob {
  _id?: string
  organization?: IOrganization
  position: string
  employmentType: string
  jobLevel: string
  skills: string[]
  salary: number
  overview: string
  requirements: string
  keywords: string[]
  createdAt?: string
  category?: string
}

export interface IGetJobsAction {
  type: typeof GET_JOBS
  payload: IJob[]
}

export interface ICreateJobAction {
  type: typeof CREATE_JOB
  payload: IJob
}

export interface IDeleteJobAction {
  type: typeof DELETE_JOB
  payload: string
}

export interface IUpdateJobAction {
  type: typeof UPDATE_JOB
  payload: IJob
}