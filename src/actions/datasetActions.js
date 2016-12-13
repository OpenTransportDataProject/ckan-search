import callAPI from './callAPI';
import { DATASET } from './types';
import { CKANURL } from './types';

export function fetchDataset(id) {
  // This form is allowed by Redux Thunk middleware
  // described below in “Async Action Creators” section.
  return (dispatch)=> dispatch(callAPI({
    type: DATASET.FETCH_DATASET,
    endpoint: CKANURL + `/api/3/action/package_show?id=${id}`
  }));
}
