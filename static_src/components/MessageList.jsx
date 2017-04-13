import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Message from './Message';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chatClose } from './../actions/chats';

class MessageListComponent extends React.Component {
  render() {
     const messageList = this.props.messageList.map(
      (messageId) => {
        console.log(messageId);
        return <Message
            key={ messageId }
            id={ messageId }/>
      }
    );
    return (
      <div className="b-post">
        {messageList}
      </div>
    );
  }
}

const mapStoreToProps = state => ({
  chatopen: state.chats.chatopen,
  messageList: state.chats.messageList,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({chatClose}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(MessageListComponent);
