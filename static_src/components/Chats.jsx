import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import ChatList from './ChatList';
import MessageList from './MessageList';


let messageContent = null;
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
  newChatList = () => {
    messageContent = <MessageList id={ this.state.chatId } />;
    this.state.isOpen = false;
    console.log(messageContent);
    return messageContent;
  }

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
    // if (this.state.isOpen) {
    //   messageContent = <MessageList id={ this.state.chatId } />;
    //   this.state.isOpen = false;
    // }
    return (
      <div>
        <Col xs={4} className="list">
          <h1>Чаты</h1>
            <ChatList
              isLoading={ this.state.isLoading }
              chatList={ this.state.chatList }
              onChatOpen={ this.onChatOpen }/>
        </Col>
        <Col xs={4} className="list">
          <h1>Сообщения</h1>
          { this.state.isOpen ? this.newChatList() : messageContent }
        </Col>
      </div>
    );
  }
}

export default ChatComponent;
