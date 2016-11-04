import React, {Component} from 'react';

class SearchBox extends Component{

  state = {
    value: ''
  }

  handleChange(value){
    this.setState({ value });
    this.props.onSearch(value);
  }

  render(){
    return (
      <p className='control has-icon has-icon-right'>
        <input className='input is-large' value={this.state.value}
        onChange={event => this.handleChange(event.target.value)} type='text' name = 'q'
        placeholder='Search'/>
        <i className='fa fa-s)earch' />
      </p>
    )
  }
}



export default SearchBox;
