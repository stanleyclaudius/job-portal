import { Dispatch } from 'redux'
import { getDataAPI } from '../../utils/fetchData'
import { ALERT, IAlertAction } from './../types/alertTypes'
import { GET_UNAPPROVED_ORGANIZATIONS, IUnapprovedOrganizationsAction } from './../types/organizationTypes'

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