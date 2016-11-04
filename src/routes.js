import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import SearchContainer from './containers/Search';
import DatasetContainer from './containers/Dataset';
import OverviewContainer from './containers/Dataset/OverviewContainer';
import OntologyContainer from './containers/Dataset/OntologyContainer';
import ResourcesContainer from './containers/Dataset/ResourcesContainer';
import MetadataContainer from './containers/Dataset/MetadataContainer';



export default (
  <Route path='/' component={App}>
    <IndexRoute component={SearchContainer} />
    <Route path='dataset/:id' component={DatasetContainer} >
      <IndexRoute component={OverviewContainer} />
      <Route path='ontology' component={OntologyContainer} />
      <Route path='resources' component={ResourcesContainer} />
      <Route path='metadata' component={MetadataContainer} />
    </Route>
  </Route>
);
