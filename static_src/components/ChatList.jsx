import React, { Component, PropTypes } from 'react';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import ChatButton from './ChatButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadChats, loadChatsSuccess, loadChatsError, chatFetchData } from './../actions/chats';
import Page from './Page';

class ChatListComponent extends React.Component {
  componentDidMount() {
    if(this.props.page != null) {
      this.props.fetchData('/api/chats/?offset=' + 10 * (parseInt(this.props.page) - 1));
    }
    else {
      this.props.fetchData('/api/chats');
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.page != this.props.page) {
      this.props.load();
      this.props.fetchData('/api/chats/?offset=' + 10 * (parseInt(nextProps.page) - 1));
    }
  }

  render() {
      const chatList = this.props.chatList.map(
        (chatId) => {
          return <ChatButton
            key={ chatId }
            id={ chatId } />
        }
      );
      let pages = [];
      for(let i = 1; i <= this.props.count + 1; i++) {
        pages.push(<Page page={i} link={'/vk/chats/page/' + i + '/'} key={i}/>);
      }
    return (
      <div>
        {pages}
        <div className="b-post-list">
         { this.props.isLoading ? <div className="loading"></div> :  chatList }
        </div>
      </div>
    );
  }
};

ChatListComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  page: PropTypes.string
};

const mapStoreToProps = state => ({
  chatList: state.chats.chatList,
  isLoading: state.chats.isLoading,
  count: state.chats.count,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(chatFetchData(url)),
    load: () => dispatch(loadChats()),
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ChatListComponent);
