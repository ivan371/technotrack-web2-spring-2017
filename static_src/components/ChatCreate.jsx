import React, { Component, PropTypes } from 'react';
import './../styles/base.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createChatFetchData } from './../actions/chats';

class ChatCreateComponent extends React.Component {
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
    this.props.fetchData('/api/posts', this.state.content);
  }
  render() {
    return (
      <div className="b-post">
        <div>
        <input
          placeholder="Название чата"
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

ChatCreateComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapStoreToProps = state => ({
  // chat: state.chats.chat,
  // email: state.users.users[props.id].email,
  // firstname: state.users.users[props.id].first_name,
  // lastname: state.users.users[props.id].last_name,
  // rating: state.users.users[props.id].rating,
  // avatar: state.users.users[props.id].avatar,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, name) => dispatch(createChatFetchData(url, name))
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ChatCreateComponent);
