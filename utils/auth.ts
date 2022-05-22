import { IRegister } from './Interface'
import { uploadFile } from './uploadHelper'
import { postDataAPI } from './fetchData'
import { Dispatch } from '@reduxjs/toolkit'

export const register = async(userData: IRegister, avatar: File[] = [], dispatch: Dispatch) => {
  try {
    dispatch({
      type: 'alert/alert',
      payload: {
        loading: true
      }
    })

    let data = { ...userData }

    if (userData.role === 'organization') {
      const imgUrl = await uploadFile(avatar, 'avatar')
      data.avatar = imgUrl[0]
    }
    
    const res = await postDataAPI('auth/register', data)
    dispatch({
      type: 'alert/alert',
      payload: {
        success: res.data.msg
      }
    })
  } catch (err: any) {
    dispatch({
      type: 'alert/alert',
      payload: {
        error: err.response.data.msg
      }
    })
  }
}