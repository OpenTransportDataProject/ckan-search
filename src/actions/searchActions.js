import callAPI from './callAPI';
import { SEARCH } from './types';

export function search(text, rows, start, active) {
  // This form is allowed by Redux Thunk middleware
  // described below in “Async Action Creators” section.
  if ( !active ){
    return (dispatch)=> dispatch(callAPI({
      type: SEARCH.SEARCH,
      endpoint: `https://ckan.larsen.so/api/3/action/package_search?q=${text}&fq=type:dataset&rows=${rows}&start=${start}`
    }));
  } else {
    if( text === '' ){
      return (dispatch)=> dispatch(callAPI({
        type: SEARCH.SEARCH,
        endpoint: `https://ckan.larsen.so/api/3/action/package_search?q=${text}&fq=type:dataset&rows=${rows}&start=${start}`
      }));
    } else {
      return (dispatch)=> dispatch(callAPI({
        type: SEARCH.SEARCH,
        endpoint: `https://ckan.larsen.so/api/3/action/semantic_search?term=${text}`
      }));
    }
  }
}

export function searchByOntology(ontology) {
  // This form is allowed by Redux Thunk middleware
  // described below in “Async Action Creators” section.
  return (dispatch)=> dispatch(callAPI({
    type: SEARCH.SEARCH_BY_ONTOLOGY,
    //TODO use subclass API
    endpoint: `https://ckan.larsen.so/api/3/action/package_search?fq=${ontology}`
  }));
}
