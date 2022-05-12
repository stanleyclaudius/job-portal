export const ALERT = 'ALERT'

export interface IAlertType {
  error?: string
  success?: string
  loading?: boolean
}

export interface IAlertAction {
  type: typeof ALERT
  payload: IAlertType
}