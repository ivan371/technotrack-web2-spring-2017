import React, { Component, PropTypes } from 'react';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import ChatButton from './ChatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadChats, loadChatsSuccess, loadChatsError, chatFetchData } from './../actions/chats';

class ChatListComponent extends React.Component {
  componentDidMount() {
    this.props.fetchData('/api/chats');
  }

  render() {
      const chatList = this.props.chatList.map(
        (chatId) => {
          return <ChatButton
            key={ chatId }
            id={ chatId } />
        }
      );
    return (
        <div className="b-post-list">
         { this.props.isLoading ? <div className="loading"></div> :  chatList }
        </div>
    );
  }
};

ChatListComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapStoreToProps = state => ({
  chatList: state.chats.chatList,
  isLoading: state.chats.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(chatFetchData(url))
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ChatListComponent);
