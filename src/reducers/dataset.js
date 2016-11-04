import { DATASET } from '../actions/types';

const initialState = {
  dataset: [],
  loading: false
};

export default function fetch(state = initialState, action) {
  switch (action.type) {

    case DATASET.FETCH_DATASET_PENDING: {
      return {
        ...state,
        loading: true
      }
    }
    case DATASET.FETCH_DATASET_SUCCESS: {
      return {
        ...state,
        loading: false,
        dataset: action.payload.json.result,
      };
    }

    default:
      return state;
  }
}
