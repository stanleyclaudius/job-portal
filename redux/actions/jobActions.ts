import { Dispatch } from 'redux'
import { postDataAPI } from '../../utils/fetchData'
import { ALERT, IAlertAction } from '../types/alertTypes'
import { CREATE_JOB, ICreateJobAction, IJob } from '../types/jobTypes'

export const createJob = (jobData: IJob, token: string) => async(dispatch: Dispatch<ICreateJobAction | IAlertAction>) => {
  try {
    const res = await postDataAPI('job', jobData, token)
    dispatch({
      type: CREATE_JOB,
      payload: res.data.job
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