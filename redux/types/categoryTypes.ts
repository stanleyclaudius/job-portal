export const CREATE_CATEGORY = 'CREATE_CATEGORY'
export const GET_CATEGORY = 'GET_CATEGORY'

export interface ICategory {
  _id?: string
  name: string
  image: string | File[]
}

export interface ICreateCategoryAction {
  type: typeof CREATE_CATEGORY
  payload: ICategory
}

export interface IGetCategoryAction {
  type: typeof GET_CATEGORY
  payload: ICategory[]
}