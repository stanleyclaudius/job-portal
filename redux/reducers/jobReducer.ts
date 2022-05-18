import { CREATE_JOB, DELETE_JOB, GET_JOBS, ICreateJobAction, IDeleteJobAction, IGetJobsAction, IJob, IUpdateJobAction, UPDATE_JOB } from './../types/jobTypes'

const jobReducer = (state: IJob[] = [], action: IGetJobsAction | ICreateJobAction | IDeleteJobAction  | IUpdateJobAction) => {
  switch (action.type) {
    case GET_JOBS:
      return action.payload
    case CREATE_JOB:
      return [action.payload, ...state]
    case DELETE_JOB:
      return state.filter(item => item._id !== action.payload)
    case UPDATE_JOB:
      return state.map(item => item._id === action.payload._id ? action.payload : item)
    default:
      return state
  }
}

export default jobReducer