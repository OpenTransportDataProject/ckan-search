import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import search from './search';
import ontology from './ontology';
import dataset from './dataset';

const appReducer = combineReducers({
  routing,
  search,
  dataset,
  ontology

});

export default function rootReducer(state, action) {
  return appReducer(state, action);
}
