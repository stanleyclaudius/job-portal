import { CREATE_JOB, DELETE_JOB, GET_JOBS, ICreateJobAction, IDeleteJobAction, IGetJobsAction, IJob, IJobState, IUpdateJobAction, UPDATE_JOB } from './../types/jobTypes'

const initialState = {
  data: [],
  totalPage: 0
}

const jobReducer = (state: IJobState = initialState, action: IGetJobsAction | ICreateJobAction | IDeleteJobAction  | IUpdateJobAction) => {
  switch (action.type) {
    case GET_JOBS:
      return action.payload
    case CREATE_JOB:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case DELETE_JOB:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload)
      }
    case UPDATE_JOB:
      return {
        ...state,
        data: state.data.map(item => item._id === action.payload._id ? action.payload : item)
      }
    default:
      return state
  }
}

export default jobReducer