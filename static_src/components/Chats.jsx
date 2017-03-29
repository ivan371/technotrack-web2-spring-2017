import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import ChatList from './ChatList';
import MessageList from './MessageList';


// let messageContent = null;
class ChatComponent extends React.Component {

  state = {
    chatList: [],
    isLoading: false,
    isOpen: false,
    chatId: null,
  }

  onChatOpen = (chatId) => {
    console.log(chatId);
    this.setState({
      chatId: chatId,
      isOpen: true,
    });
  }
  // newChatList = () => {
  //   messageContent = <MessageList id={ this.state.chatId } />;
  //   this.state.isOpen = false;
  //   console.log(messageContent);
  //   return messageContent;
  // }

  componentDidMount() {
    this.setState({ isLoading: true });
    let userId = null;
    fetch('/api/chats/', {
      credentials: "same-origin",
    })
    .then((resp) => resp.json())
    .then((data) => {
      this.setState({ chatList: data.results, isLoading: false });
    }
    ).catch(alert);

  }

  render() {
    let messageContent = null;
    if (this.state.isOpen && this.state.chatId != null) {
      messageContent = <MessageList id={ this.state.chatId } />;
      this.state.isOpen = false;
    }
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Чаты</h1></div>
            <ChatList
              isLoading={ this.state.isLoading }
              chatList={ this.state.chatList }
              onChatOpen={ this.onChatOpen }/>
          </div>
        <div className="box">
          <div className="b-post"><h1>Сообщения</h1></div>
          { messageContent }
        </div>
      </div>
    );
  }
}

export default ChatComponent;
