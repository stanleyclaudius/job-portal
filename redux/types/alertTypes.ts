export const ALERT = 'ALERT'

export interface IAlert {
  error?: string
  success?: string
  loading?: boolean
}

export interface IAlertAction {
  type: typeof ALERT
  payload: IAlert
}