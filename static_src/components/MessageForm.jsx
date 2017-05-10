import React, { Component, PropTypes } from 'react';
import './../styles/base.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createMessageFetchData } from './../actions/chats';

class MessageFormComponent extends React.Component {
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
    this.props.fetchData('/api/messages/', this.props.chat, this.state.content);
  }
  render() {
    return (
      <div className="b-post">
        <div>
        <textarea
          placeholder="Введите сообщение"
          className="area"
          value={ this.state.content }
          onChange={ this.onChange }
          name="content"></textarea>
      </div>
        <div className="button_field">
          <button onClick={ this.onCreate.bind(this) }>Отправить</button>
      </div>
       </div>
    );
  }
}

MessageFormComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
  chat: PropTypes.string.isRequired,
};

const mapStoreToProps = (state, props) => ({
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, chat, content) => dispatch(createMessageFetchData(url, chat, content))
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(MessageFormComponent);
