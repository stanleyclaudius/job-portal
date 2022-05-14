import { Dispatch } from 'redux'
import { getDataAPI, postDataAPI } from '../../utils/fetchData'
import { ALERT, IAlertAction } from '../types/alertTypes'
import { CREATE_JOB, GET_JOBS, ICreateJobAction, IGetJobsAction, IJob } from '../types/jobTypes'

export const getJobs = (token: string) => async(dispatch: Dispatch<IGetJobsAction | IAlertAction>) => {
  try {
    dispatch({
      type: ALERT,
      payload: { loading: true }
    })

    const res = await getDataAPI('job', token)
    dispatch({
      type: GET_JOBS,
      payload: res.data.jobs
    })

    dispatch({
      type: ALERT,
      payload: {}
    })
  } catch (err: any) {
    dispatch({
      type: ALERT,
      payload: { error: err.response.data.msg }
    })
  }
}

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