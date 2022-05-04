import { Dispatch } from 'redux'
import { ALERT, IAlertType } from './../types/alertTypes'
import { AUTH, IAuthType } from './../types/authTypes'
import { postDataAPI } from './../../utils/fetchData'
import { IUserLogin } from './../../utils/Interface'

export const login = (userData: IUserLogin) => async(dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/login', userData)
    localStorage.setItem('jobseek_isAuthenticated', 'true')
    dispatch({
      type: AUTH,
      payload: {
        token: res.data.accessToken,
        user: res.data.user
      }
    })

    dispatch({
      type: ALERT,
      payload: {
        success: res.data.msg
      }
    })
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        errors: err.response.data.msg
      }
    })
  }
}