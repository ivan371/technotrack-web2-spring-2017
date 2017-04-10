import React from 'react';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import ChatButton from './ChatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadChats, loadChatsSuccess, loadChatsError } from './../actions/chats';

class ChatListComponent extends React.Component {
  componentDidMount() {
    this.props.loadChats();
    fetch('/api/chats/', {
      credentials: "same-origin",
    })
    .then((resp) => resp.json())
    .then((data) => {
      this.props.loadChatsSuccess(data.results);
    }
  ).catch(console.log);

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
         { this.props.isLoading ? <div>Загрузка...</div> :  chatList }
        </div>
    );
  }
};

const mapStoreToProps = state => ({
  chatList: state.chats.chatList,
  isLoading: state.chats.isLoading,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    loadChats,
    loadChatsSuccess,
    loadChatsError,}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ChatListComponent);
