import { GET_ADMIN_CATEGORY, IAdminCategory, IGetAdminCategoryAction } from "../types/categoryTypes";

const initialState = {
  data: [],
  totalPage: 0
}

const adminCategoryReducer = (state: IAdminCategory = initialState, action: IGetAdminCategoryAction) => {
  switch (action.type) {
    case GET_ADMIN_CATEGORY:
      return action.payload
    default:
      return state
  }
}

export default adminCategoryReducer