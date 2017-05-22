import React, { Component, PropTypes } from 'react';
import './../styles/base.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createGroupFetchData } from './../actions/groups';

class GroupCreateComponent extends React.Component {
  state = {
    content: '',
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onCreate = (e) => {
    e.preventDefault();
    this.setState({content: ''});
    this.props.fetchData('/api/groups/', this.state.content);
  }
  render() {
    return (
      <div className="b-post">
        <div>
        <input
          placeholder="Название Группы"
          className="area"
          value={ this.state.content }
          onChange={ this.onChange }
          name="content"></input>
      </div>
        <div className="button_field">
          <button onClick={ this.onCreate.bind(this) }>Создать</button>
      </div>
       </div>
    );
  }
}

GroupCreateComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapStoreToProps = state => ({
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, name) => dispatch(createGroupFetchData(url, name))
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(GroupCreateComponent);
