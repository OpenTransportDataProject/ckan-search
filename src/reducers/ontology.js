import { ONTOLOGY } from '../actions/types';

const initialState = {
  ontologies: [],
  loading: false,
  ontolgiesByDataset: {}, //json data from API
  resultByNode: [],
  datasetRelationsByNode: {},
  resultNodesByDataset: []
};

export default function ontology(state = initialState, action) {
  switch (action.type) {

    case ONTOLOGY.FETCH_ONTOLOGIES_PENDING:{
      return {
        ...state,
        loading: true
      }
    }

    case ONTOLOGY.FETCH_ONTOLOGIES_SUCCESS:{
      return {
        ...state,
        loading: false,
        ontologies: action.payload.json.result
      }
    }

    case ONTOLOGY.SEARCH_BY_NODE_PENDING:{
      return {
        ...state,
        loading: true
      }
    }

    case ONTOLOGY.SEARCH_BY_NODE_SUCCESS:{
      return {
        ...state,
        loading: false,
        resultByNode: action.payload.json.result
      }
    }

    case ONTOLOGY.GET_NODES_BY_DATASET_PENDING:{
      return {
        ...state,
        loading: true
      }
    }

    case ONTOLOGY.GET_NODES_BY_DATASET_SUCCESS:{
      return {
        ...state,
        loading: false,
        resultNodesByDataset: action.payload.json.result
      }
    }

    default:
      return state;
  }
}
