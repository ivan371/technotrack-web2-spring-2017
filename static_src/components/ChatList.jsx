import React from 'react';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import ChatButton from './ChatButton';

class ChatListComponent extends React.Component {
  onOpen = (id) => {
    this.props.onChatOpen(id);
    // console.log(id);
  }
  render() {
      const chatList = this.props.chatList.map(
        (chat) => {
          return <ChatButton
            key={ chat.id }
            id={ chat.id }
            onOpen={ this.onOpen }
            content={ chat.name }
            />
        }
      );
    return (
        <div className="b-post-list">
          { this.props.isLoading ? <div>Загрузка...</div> :  chatList }
        </div>
    );
  }
};

ChatListComponent.propTypes = {
  postList: React.PropTypes.arrayOf(React.PropTypes.string),
  isLoading: React.PropTypes.bool,
  onChatOpen: React.PropTypes.func,
};

export default ChatListComponent;
