import { IJobseeker } from './../../utils/Interface'

export const OPEN_DESCRIPTION_MODAL = 'OPEN_DESCRIPTION_MODAL'

export interface IOpenDescriptionActions {
  type: typeof OPEN_DESCRIPTION_MODAL
  payload: IJobseeker | null
}