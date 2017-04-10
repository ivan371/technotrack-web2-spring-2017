import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Message from './Message';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chatClose } from './../actions/chats';

class MessageListComponent extends React.Component {
  // state = {
  //   messageList: [],
  //   isLoading: true,
  //   isOpen: true,
  // }
  // componentDidMount() {
  //     console.log(this.props.id);
  //     fetch('/api/messages/?chat=' + this.props.id, {
  //       credentials: "same-origin",
  //     })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       console.log(data.results);
  //       this.setState({ messageList: data.results, isLoading: false });
  //     }
  //   ).catch(console.log);
  // }
  componentWillReceiveProps(nextProps) {
    if(nextProps.messageList != this.props.messageList) {
      console.log('comprecieve', this.props.messageList);
      // this.props.chatClose();
    //   fetch('/api/messages/?chat=' + nextProps.id, {
    //     credentials: "same-origin",
    //   })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     console.log(data.results);
    //     this.setState({ messageList: data.results, isLoading: false });
    //   }
    // ).catch(console.log);
  }

  }
  render() {
    //let messageList = null;
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
          { this.props.chatopen ? <div>Загрузка...</div> :  messageList }
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
