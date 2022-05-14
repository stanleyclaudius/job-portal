import { Dispatch} from 'redux'
import { getDataAPI, patchDataAPI } from '../../utils/fetchData'
import { ALERT, IAlertAction } from '../types/alertTypes'
import { CHANGE_APPLICANT_STATUS, GET_APPLICANTS, IChangeApplicantStatusAction, IGetApplicantsAction } from '../types/applicantTypes'

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

export const changeApplicantStatus = (jobId: string, jobseeker: string, status: string, token: string) => async(dispatch: Dispatch<IChangeApplicantStatusAction | IAlertAction>) => {
  try {
    const res = await patchDataAPI(`jobs-applied/status/${jobseeker}`, { job: jobId, status }, token)
    dispatch({
      type: CHANGE_APPLICANT_STATUS,
      payload: {
        job: jobId,
        jobseeker,
        status
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