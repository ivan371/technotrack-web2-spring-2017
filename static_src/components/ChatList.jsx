import React from 'react';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import ChatButton from './ChatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadChats, loadChatsSuccess, loadChatsError } from './../actions/chats';

class ChatListComponent extends React.Component {
  // onOpen = (id) => {
  //   this.props.onChatOpen(id);
  //   // console.log(id);
  // }
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
      // const chatList = this.props.chatList.map(
      //   (chat) => {
      //     return <ChatButton
      //       key={ chat.id }
      //       id={ chat.id }
      //       onOpen={ this.onOpen }
      //       content={ chat.name }
      //       />
      //   }
      // );
    return (
        <div className="b-post-list">
          {/* { this.props.isLoading ? <div>Загрузка...</div> :  chatList } */}
        </div>
    );
  }
};

// ChatListComponent.propTypes = {
//   postList: React.PropTypes.arrayOf(React.PropTypes.string),
//   isLoading: React.PropTypes.bool,
//   onChatOpen: React.PropTypes.func,
// };

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
