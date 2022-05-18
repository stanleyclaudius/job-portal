import { Dispatch } from 'redux'
import { deleteDataAPI, getDataAPI, patchDataAPI } from '../../utils/fetchData'
import { ALERT, IAlertAction } from './../types/alertTypes'
import { CHANGE_ORGANIZATION_STATUS, GET_UNAPPROVED_ORGANIZATIONS, IChangeOrganizationStatusAction, IGetUnapprovedOrganizationsAction } from './../types/organizationTypes'

export const getUnapprovedOrganizations = (token: string, page: number = 1) => async(dispatch: Dispatch<IGetUnapprovedOrganizationsAction | IAlertAction>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI(`organization/unapproved?page=${page}`, token)
    dispatch({
      type: GET_UNAPPROVED_ORGANIZATIONS,
      payload: {
        data: res.data.organizations,
        totalPage: res.data.totalPage
      }
    })

    dispatch({
      type: ALERT,
      payload: {}
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

export const acceptOrganization = (id: string, token: string) => async(dispatch: Dispatch<IChangeOrganizationStatusAction | IAlertAction>) => {
  try {
    const res = await patchDataAPI(`organization/accept/${id}`, {}, token)
    dispatch({
      type: CHANGE_ORGANIZATION_STATUS,
      payload: id
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

export const rejectOrganization = (id: string, token: string) => async(dispatch: Dispatch<IChangeOrganizationStatusAction | IAlertAction>) => {
  try {
    const res = await deleteDataAPI(`organization/reject/${id}`, token)
    dispatch({
      type: CHANGE_ORGANIZATION_STATUS,
      payload: id
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