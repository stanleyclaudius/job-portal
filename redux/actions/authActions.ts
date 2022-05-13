import { Dispatch } from 'redux'
import { AUTH, IAuthAction } from './../types/authTypes'
import { getDataAPI, postDataAPI } from './../../utils/fetchData'
import { ALERT, IAlertAction } from './../types/alertTypes'
import { IDecodedRegisterToken, IUserLogin } from '../../utils/Interface'
import Cookie from 'js-cookie'
import { uploadImage } from '../../utils/imageHelper'

export const login = (userData: IUserLogin) => async(dispatch: Dispatch<IAuthAction | IAlertAction>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await postDataAPI('auth/login', userData)
    localStorage.setItem('jobseek_logged', 'true')

    Cookie.set('jobseek_rfToken', res.data.refreshToken, {
      expires: 30
    })

    dispatch({
      type: AUTH,
      payload: {
        accessToken: res.data.accessToken,
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
        error: err.response.data.msg
      }
    })
  }
}

export const register = (userData: IDecodedRegisterToken, avatar: File[] = []) => async(dispatch: Dispatch<IAlertAction>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    let data = { ...userData }

    if (userData.role === 'organization') {
      const imgUrl = await uploadImage(avatar, 'avatar')
      data.avatar = imgUrl[0]
    }
    
    const res = await postDataAPI('auth/register', data)
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
        error: err.response.data.msg
      }
    })
  }
}

export const refreshToken = () => async(dispatch: Dispatch<IAuthAction | IAlertAction>) => {
  const logged = localStorage.getItem('jobseek_logged')
  if (logged !== 'true') return

  try {
    const res = await getDataAPI('auth/refresh_token')
    dispatch({
      type: AUTH,
      payload: res.data
    })
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}