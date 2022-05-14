import { CREATE_JOB, GET_JOBS, ICreateJobAction, IGetJobsAction, IJob } from './../types/jobTypes'

const jobReducer = (state: IJob[] = [], action: IGetJobsAction | ICreateJobAction) => {
  switch (action.type) {
    case GET_JOBS:
      return action.payload
    case CREATE_JOB:
      return [action.payload, ...state]
    default:
      return state
  }
}

export default jobReducer