import { Dispatch } from 'redux'
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'
import { ALERT, IAlertAction } from '../types/alertTypes'
import { CREATE_JOB, DELETE_JOB, GET_JOBS, ICreateJobAction, IDeleteJobAction, IGetJobsAction, IJob, IUpdateJobAction, UPDATE_JOB } from '../types/jobTypes'

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

export const deleteJob = (id: string, token: string) => async(dispatch: Dispatch<IDeleteJobAction | IAlertAction>) => {
  try {
    const res = await deleteDataAPI(`job/${id}`, token)
    dispatch({
      type: DELETE_JOB,
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

export const updateJob = (id: string, jobData: IJob, token: string) => async(dispatch: Dispatch<IUpdateJobAction | IAlertAction>) => {
  try {
    const res = await patchDataAPI(`job/${id}`, jobData, token)
    dispatch({
      type: UPDATE_JOB,
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