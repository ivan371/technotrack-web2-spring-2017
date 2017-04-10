import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import ChatList from './ChatList';
import MessageList from './MessageList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// let messageContent = null;
class ChatComponent extends React.Component {

  // state = {
  //   chatList: [],
  //   isLoading: false,
  //   isOpen: false,
  //   chatId: null,
  // }

  // onChatOpen = (chatId) => {
  //   console.log(chatId);
  //   this.setState({
  //     chatId: chatId,
  //     isOpen: true,
  //   });
  // }


  render() {
    // let messageContent = null;
    // if (this.state.isOpen && this.state.chatId != null) {
    //   messageContent = <MessageList id={ this.state.chatId } />;
    //   this.state.isOpen = false;
    // }
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Чаты</h1></div>
        <ChatList/>
            {/* <ChatList
              isLoading={ this.state.isLoading }
              chatList={ this.state.chatList }
              onChatOpen={ this.onChatOpen }/> */}
          </div>
        <div className="box">
          <div className="b-post"><h1>Сообщения</h1></div>
          {/* { messageContent } */}
        </div>
      </div>
    );
  }
}


const mapStoreToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ChatComponent);
