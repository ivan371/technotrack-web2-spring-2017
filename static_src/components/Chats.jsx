import React from 'react';
import ChatList from './ChatList';
import MessageList from './MessageList';
import ChatCreate from './ChatCreate.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chatuserOpen, chatuseradd } from './../actions/chats';
import Modal from './Modal';

class ChatComponent extends React.Component {

  render() {
    let messageContent = null;
    let model = null;
    let users = null;
    const action = "ChatUsers";
    if (this.props.modelopen) {
      model = <Modal action={ action } chat={this.props.params.id}/>;
    }
    // if (this.props.chatopen) {
    //   messageContent = <MessageList />;
    //   users = <div className="button_field">
    //     <button onClick={ this.props.chatuserOpen.bind(this) }>Пользователи</button>
    //   </div>;
    // }
    let page = null;
    if(this.props.params.id != null && this.props.params.page == 'page') {
      page = this.props.params.id;
    }
    console.log(this.props.params.id);
    if(this.props.params.id != null && this.props.params.page == null) {
      messageContent = <MessageList chat={this.props.params.id}/>;
      users = <div className="button_field">
        <button onClick={ this.props.chatuserOpen.bind(this) }>Пользователи</button>
      </div>;
    }
    else {
      messageContent = null;
    }
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Чаты</h1></div>
        <div className="b-post"><ChatList page={page}/></div>
        <ChatCreate/>
          </div>
        <div className="box">
          <div className="b-post">
            <h1>Сообщения</h1>
            { users }
          </div>
          { messageContent }
        </div>
        { model }
      </div>
    );
  }
}


const mapStoreToProps = state => ({
  chatopen: state.chats.chatopen,
  modelopen: state.chats.modalopen,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({chatuserOpen}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ChatComponent);
