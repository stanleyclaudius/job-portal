import { IUser } from "../../utils/Interface"
import { IJob } from "./jobTypes"

export const SEND_INVITATION = 'SEND_INVITATION'
export const GET_RECEIVED_INVITATION = 'GET_RECEIVED_INVITATION'
export const CHANGE_INVITATION_STATUS = 'CHANGE_INVITATION_STATUS'

export interface IInvitation {
  _id?: string
  job: IJob
  user: IUser
  status?: string
}

export interface IChangeInvitation {
  id: string
  status: string
}

export interface ISendInvitationAction {
  type: typeof SEND_INVITATION
  payload: IInvitation
}

export interface IGetInvitationAction {
  type: typeof GET_RECEIVED_INVITATION
  payload: IInvitation[]
}

export interface IChangeInvitationStatusAction {
  type: typeof CHANGE_INVITATION_STATUS
  payload: IChangeInvitation
}