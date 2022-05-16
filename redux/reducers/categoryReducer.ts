import { CREATE_CATEGORY, GET_CATEGORY, ICategory, ICreateCategoryAction, IGetCategoryAction } from './../types/categoryTypes'

const categoryReducer = (state: ICategory[] = [], action: ICreateCategoryAction | IGetCategoryAction) => {
  switch (action.type) {
    case GET_CATEGORY:
      return action.payload
    case CREATE_CATEGORY:
      return [action.payload, ...state]
    default:
      return state
  }
}

export default categoryReducer