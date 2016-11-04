import callAPI from './callAPI';
import { DATASET } from './types';

export function fetchDataset(id) {
  // This form is allowed by Redux Thunk middleware
  // described below in “Async Action Creators” section.
  return (dispatch)=> dispatch(callAPI({
    type: DATASET.FETCH_DATASET,
    endpoint: `https://ckan.larsen.so/api/3/action/package_show?id=${id}`
  }));
}
