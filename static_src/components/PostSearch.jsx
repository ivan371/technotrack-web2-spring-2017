import React, { Component, PropTypes } from 'react';
import './../styles/base.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postFetchData } from './../actions/posts';

class PostSearchComponent extends React.Component {
  state = {
    text: '',
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onCreate = (e) => {
    e.preventDefault();
    this.setState({text: ''});
    this.props.fetchData('/ugc/posts/?query=' + this.state.text);
  }
  render() {
    return (
      <div className="b-post">
        <div>
        <input
          placeholder="Поиск"
          className="area"
          value={ this.state.content }
          onChange={ this.onChange }
          name="text"></input>
      </div>
        <div className="button_field">
          <button>Найти</button>
      </div>
       </div>
    );
  }
}



const mapStoreToProps = (state, props) => ({

});
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({}, dispatch),
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(PostSearchComponent);
