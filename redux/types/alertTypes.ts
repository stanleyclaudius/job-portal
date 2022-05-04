export const ALERT = 'ALERT'

export interface IAlert {
  errors?: string
  success?: string
  loading?: boolean
}

export interface IAlertType {
  type: typeof ALERT
  payload: IAlert
}