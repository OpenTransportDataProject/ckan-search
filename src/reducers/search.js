import { SEARCH } from '../actions/types';

const initialState = {
  count: 0,
  search: '',
  result: [],
  loading: false,
  resultByOntology: [],
  searchValue: '',
  hasMore: true
};

export default function search(state = initialState, action) {
  switch (action.type) {
    case SEARCH.SEARCH_PENDING:{
      return {
        ...state,
        loading: true
      }
    }

    case SEARCH.SEARCH_BY_ONTOLOGY_PENDING:{
      return {
        ...state,
        loading: true
      }
    }


    case SEARCH.SEARCH_SUCCESS: {

      if ( action.meta.apiUrl.split('=')[0].split('?')[1] == "term"){
        return {
          ...state,
          loading: false,
          result: action.payload.json.result,
          searchValue: action.meta.apiUrl.split('=')[1],
          hasMore: false,
        }

      } else {
        var index = parseInt(action.meta.apiUrl.split('&')[3].split('=')[1]) + 10

        if ( action.payload.json.result.count > index ){
          var more = true
        } else {
          var more = false
        }
        if ( state.search === action.meta.apiUrl.split('&')[0] ) {
          if ( !parseInt(action.meta.apiUrl.split('&')[3].split('=')[1]) ){
            return {
              ...state,
              loading: false,
              search: action.meta.apiUrl.split('&')[0],
              count: action.payload.json.result.count,
              result: action.payload.json.result.results,
              searchValue: action.meta.apiUrl.split('&')[0].split('=')[1],
              hasMore: more,
            }
          } else {
            return {
              ...state,
              loading: false,
              result: [...state.result, ...action.payload.json.result.results],
              searchValue: action.meta.apiUrl.split('&')[0].split('=')[1],
              hasMore: more,
            }
          }
        } else {
          return {
            ...state,
            loading: false,
            search: action.meta.apiUrl.split('&')[0],
            count: action.payload.json.result.count,
            result: action.payload.json.result.results,
            searchValue: action.meta.apiUrl.split('&')[0].split('=')[1],
            hasMore: more,
          }
        }
      }
    }

    case SEARCH.SEARCH_BY_ONTOLOGY_SUCCESS: {
      return {
        ...state,
        loading: false,
        resultByOntology: action.payload.json.result.results,
      };
    }

    default:
      return state;
  }
}
