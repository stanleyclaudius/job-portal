import { Dispatch} from 'redux'
import { getDataAPI } from '../../utils/fetchData'
import { ALERT, IAlertAction } from '../types/alertTypes'
import { GET_APPLICANTS, IGetApplicantsAction } from '../types/applicantTypes'

export const getApplicants = (jobId: string, token: string) => async(dispatch: Dispatch<IGetApplicantsAction | IAlertAction>) => {
  try {
    const res = await getDataAPI(`job/applicant/${jobId}`, token)
    dispatch({
      type: GET_APPLICANTS,
      payload: res.data.applicants
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