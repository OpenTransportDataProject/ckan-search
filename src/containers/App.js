import React, { Component } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { loadOntologies } from '../actions/ontologyActions';

type Props = {
  children: any
};

class AppContainer extends Component {

  props: Props

  componentDidMount = () => {
    this.props.loadOntologies();
  }

  render(){
    return(
      <div>
          <Header />
          <img src="images/transport_header.jpg" align="middle"></img>
          {this.props.children}
        </div>
      )
  }
}

const mapDispatchToProps = {
  loadOntologies
};

export default connect(null, mapDispatchToProps)(AppContainer);
