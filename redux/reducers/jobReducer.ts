import { CREATE_JOB, DELETE_JOB, GET_JOBS, ICreateJobAction, IDeleteJobAction, IGetJobsAction, IJob } from './../types/jobTypes'

const jobReducer = (state: IJob[] = [], action: IGetJobsAction | ICreateJobAction | IDeleteJobAction) => {
  switch (action.type) {
    case GET_JOBS:
      return action.payload
    case CREATE_JOB:
      return [action.payload, ...state]
    case DELETE_JOB:
      return state.filter(item => item._id !== action.payload)
    default:
      return state
  }
}

export default jobReducer