import callAPI from './callAPI';
import { ONTOLOGY } from './types';

export function loadOntologies() {
  // This form is allowed by Redux Thunk middleware
  // described below in “Async Action Creators” section.
  return (dispatch)=> dispatch(callAPI({
    type: ONTOLOGY.FETCH_ONTOLOGIES,
    endpoint: `https://ckan.larsen.so/api/3/action/list_ontologies`
  }));
}

export function searchByNode(node) {
  return (dispatch)=> dispatch(callAPI({
    type: ONTOLOGY.SEARCH_BY_NODE,
    endpoint: `https://ckan.larsen.so/api/3/action/semantic_search?term=${node}`
  }));
}
export function getNodesByDataset(datasetID) {
    return (dispatch)=> dispatch(callAPI({
      type: ONTOLOGY.GET_NODES_BY_DATASET,
      endpoint: `https://ckan.larsen.so/api/3/action/dataset_ontologies?id=${datasetID}`
    }));
}
