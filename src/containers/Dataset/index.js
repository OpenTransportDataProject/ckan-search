import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Hero } from '../../components/Layout';
import { push } from 'react-router-redux';
import Tag from '../../components/Tag';
import DatasetListItem from '../../components/Dataset/DatasetListItem';
import { searchByOntology } from '../../actions/searchActions';
import { fetchDataset } from '../../actions/datasetActions';
import { searchByNode } from '../../actions/ontologyActions';
import { getNodesByDataset } from '../../actions/ontologyActions';


class DatasetContainer extends Component {

  componentDidMount(){
    this.props.fetchDataset(this.props.params.id)
    this.props.getNodesByDataset(this.props.dataset.id);
  }

  render() {
    return (
      <div>
        <Hero
          size='medium'
          color='info'
          bold
          title={this.props.dataset.title}
          subtitle={this.props.dataset.notes}
          tabs={[
            {
              lable: 'Overview',
              uri: `/dataset/${this.props.params.id}`
            },
            {
              lable: 'Ontology',
              uri: `/dataset/${this.props.params.id}/ontology`
            },
            {
              lable: 'Resources',
              uri: `/dataset/${this.props.params.id}/resources`
            },
            {
              lable: 'Metadata activity',
              uri: `/dataset/${this.props.params.id}/metadata`
            }
          ]}
        >
        {this.props.dataset.tags && this.props.dataset.tags.map(tag => <Tag key={tag.id}>{tag.display_name}</Tag>)}
        </Hero>
        {React.cloneElement(this.props.children, {
          dataset: this.props.dataset,
          searchByOntology: this.props.searchByOntology,
          resultByOntology: this.props.resultByOntology,
          loading: this.props.loadingSearch,
          searchByNode: this.props.searchByNode,
          resultByNode: this.props.resultByNode,
          ontologies: this.props.ontologies,
          push: this.props.push,
          loadingOntology: this.props.loadingOntology,
          resultNodesByDataset: this.props.resultNodesByDataset,
          getNodesByDataset: this.props.getNodesByDataset
        })}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  dataset: store.dataset.dataset,
  loading: store.dataset.loading,
  loadingSearch: store.search.loading,
  resultByOntology: store.search.resultByOntology,
  ontologies: store.ontology.ontologies,
  resultByNode: store.ontology.resultByNode,
  loadingOntology: store.ontology.loading,
  resultNodesByDataset: store.ontology.resultNodesByDataset
});

const mapDispatchToProps = {
  fetchDataset,
  searchByOntology,
  push,
  searchByNode,
  getNodesByDataset
};

export default connect(mapStateToProps, mapDispatchToProps)(DatasetContainer);
