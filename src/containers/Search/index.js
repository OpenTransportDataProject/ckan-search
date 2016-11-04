import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Hero, Container } from '../../components/Layout';
import Tag from '../../components/Tag';
import SearchBox from '../../components/SearchBox';
import DatasetListItem from '../../components/Dataset/DatasetListItem';
import {search} from '../../actions/searchActions';
import {debounce} from 'lodash'
import Loader from '../../components/Loader'
import './search.css'


class SearchContainer extends Component {

  constructor(props){
    super(props);
    this.search = debounce(this.props.search,300);
    this.state = {
      search: '',
      rows: 10,
      start: 0,
      active: 0,
    }
  }

  componentDidMount = () => {
    this.load();
  }

  load = () => {
    const { search, rows, start, active } = this.state;
    this.search(search, rows, start);
  }

  loadMore = () => {
    if (this.props.searchValue != this.state.search ){
      this.setState(
        { start: 0 }
      )
    }
    this.setState(
      { start: this.state.start + this.state.rows, search: this.props.searchValue },
      () => this.load()
    )
  }

  getTabs = () =>{
    if ( this.state.active === 0 ){
      return (
        <div className="tabs">
          <ul className = "nav nav-tabs">
            <li className="is-active"><a>Search</a></li>
            <li><a onClick={this.updateActive}>Semantic search</a></li>
          </ul>
        </div>
      )
    } else {
      return (
        <div className="tabs">
          <ul className = "nav nav-tabs">
            <li onClick={this.updateActive}><a>Search</a></li>
            <li className="is-active"><a>Semantic search</a></li>
          </ul>
        </div>
      )
    }
  }

  updateActive = () =>{
    if (this.state.active === 0 ){
      this.setState(
        { active: 1, start: 0 }
      )
      this.search(this.props.searchValue, 10, 0, 1)
    } else {
      this.setState(
        { active: 0, start: 0 }
      )
      this.search(this.props.searchValue, 10, 0, 0)
    }
  }

  getNodeName = (dataset) =>{
    if ( dataset.found_in_node == null ){
      var name = []
      return name
    } else {
      var node = dataset.found_in_node
      var name = []
      name.push({name: node.name})
      return name
    }
  }


  render() {
    return (
      <div>
        <Hero
          size='medium'
          color='info'
          bold
          class='search-hero'
        >
          {this.getTabs()}
          <SearchBox onSearch={value => this.search(value, 10, 0, this.state.active)} />
        </Hero>
        <Container>
          <InfiniteScroll
            next={this.loadMore}
            hasMore={this.props.hasMore}
            loader={<Loader/>}
          >
          {this.props.result.map(dataset => <DatasetListItem
            title={dataset.title}
            onClick={() => this.props.push(`/dataset/${dataset.id}`)}
            notes={dataset.notes}
            node={this.getNodeName(dataset)}
            />
          )
          }
          </InfiniteScroll>
        </Container>
      </div>
    );
  }
}




const mapStateToProps = store => ({
  result: store.search.result,
  loading: store.search.loading,
  searchValue: store.search.searchValue,
  hasMore: store.search.hasMore
});

const mapDispatchToProps = {
  push,
  search
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
