import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import ChatList from './ChatList';
import MessageList from './MessageList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// let messageContent = null;
class ChatComponent extends React.Component {

  render() {
    let messageContent = null;
    if (this.props.chatopen) {
      messageContent = <MessageList />;
    }
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Чаты</h1></div>
        <ChatList/>
          </div>
        <div className="box">
          <div className="b-post"><h1>Сообщения</h1></div>
          { messageContent }
        </div>
      </div>
    );
  }
}


const mapStoreToProps = state => ({
  chatopen: state.chats.chatopen,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ChatComponent);
