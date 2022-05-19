import { CREATE_CATEGORY, DELETE_CATEGORY, GET_ADMIN_CATEGORY, IAdminCategory, ICreateCategoryAction, IDeleteCategoryAction, IGetAdminCategoryAction, IUpdateCategoryAction, UPDATE_CATEGORY } from "../types/categoryTypes";

const initialState = {
  data: [],
  totalPage: 0
}

const adminCategoryReducer = (state: IAdminCategory = initialState, action: IGetAdminCategoryAction | ICreateCategoryAction | IUpdateCategoryAction | IDeleteCategoryAction) => {
  switch (action.type) {
    case GET_ADMIN_CATEGORY:
      return action.payload
    case CREATE_CATEGORY:
      return {
        ...state,
        data: [action.payload, ...state.data]
      }
    case UPDATE_CATEGORY:
      return {
        ...state,
        data: state.data.map(item => item._id === action.payload._id ? action.payload : item)
      }
    case DELETE_CATEGORY:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload)
      }
    default:
      return state
  }
}

export default adminCategoryReducer