import { IUser } from './../../utils/Interface'

export const GET_UNAPPROVED_ORGANIZATIONS = 'GET_UNAPPROVED_ORGANIZATIONS'
export const CHANGE_ORGANIZATION_STATUS = 'CHANGE_ORGANIZATION_STATUS'

export interface IOrganization {
  _id: string
  user: IUser
  phoneNumber: string
  createdDate: string
  totalEmployee: number
  industryType: string
  address: string
  description: string
  status: string
  createdAt: string
}

export interface IGetUnapprovedOrganizationsAction {
  type: typeof GET_UNAPPROVED_ORGANIZATIONS
  payload: IOrganization[]
}

export interface IChangeOrganizationStatusAction {
  type: typeof CHANGE_ORGANIZATION_STATUS
  payload: string
}