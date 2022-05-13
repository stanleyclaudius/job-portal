import { Dispatch } from 'redux'
import { getDataAPI, patchDataAPI } from '../../utils/fetchData'
import { ALERT, IAlertAction } from './../types/alertTypes'
import { ACCEPT_ORGANIZATION, GET_UNAPPROVED_ORGANIZATIONS, IAcceptOrganizationAction, IUnapprovedOrganizationsAction } from './../types/organizationTypes'

export const getUnapprovedOrganizations = (token: string) => async(dispatch: Dispatch<IUnapprovedOrganizationsAction | IAlertAction>) => {
  try {
    dispatch({
      type: ALERT,
      payload: {
        loading: true
      }
    })

    const res = await getDataAPI('organization/unapproved', token)
    dispatch({
      type: GET_UNAPPROVED_ORGANIZATIONS,
      payload: res.data.organizations
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

export const acceptOrganization = (id: string, token: string) => async(dispatch: Dispatch<IAcceptOrganizationAction | IAlertAction>) => {
  try {
    const res = await patchDataAPI(`organization/accept/${id}`, {}, token)
    dispatch({
      type: ACCEPT_ORGANIZATION,
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