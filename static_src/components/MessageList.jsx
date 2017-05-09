import React, { Component, PropTypes } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Message from './Message';
import MessageForm from './MessageForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chatClose } from './../actions/chats';
import { messageFetchData } from './../actions/chats';

class MessageListComponent extends React.Component {
  componentDidMount() {
    this.props.fetchData('/api/messages/?chat=' + this.props.chat);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.chat != this.props.chat) {
      this.props.fetchData('/api/messages/?chat=' + nextProps.chat);
    }
  }
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
      <div scrolling="auto">
        {messageList}
        <MessageForm/>
      </div>
    );
  }
}

MessageListComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
  chat: PropTypes.string.isRequired,
};

const mapStoreToProps = state => ({
  chatopen: state.chats.chatopen,
  messageList: state.chats.messageList,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({chatClose}, dispatch),
  fetchData: (url) => dispatch(messageFetchData(url))
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(MessageListComponent);
