import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { newsFetchData } from './../actions/news';
import { connect } from 'react-redux';
import New from './New';
import Post from './Post';
import Message from './Message';
import ChatButton from './ChatButton';

class NewsComponent extends React.Component {
  componentDidMount() {
    this.props.fetchData('/api/events');
  }
  render() {
    let newsList = [];
    if (!this.props.isLoading) {
      newsList = this.props.newsList.map(
        (newId) => {
          switch (this.props.news[newId].objtype) {
            case 'post':
                return (<div key={ newId }>
                  <div className="b-post_dark">
                    <h3>{ this.props.users[this.props.news[newId].author].username } создал пост</h3>
                  </div>
                  <Post id={ this.props.news[newId].target }/>
                </div>);
              break;
            case 'chat':
                return (<div key={ newId }>
                  <div className="b-post_dark">
                    <h3>{ this.props.users[this.props.news[newId].author].username } создал чат</h3>
                  </div>
                  <ChatButton id={ this.props.news[newId].target }/>
                </div>);
              break;
            case 'message':
                return (<div key={ newId }>
                  <div className="b-post_dark">
                    <h3>{ this.props.users[this.props.news[newId].author].username } создал сообщение</h3>
                  </div>
                  <Message id={ this.props.news[newId].target }/>
                </div>);
              break;
            default:

          }
          return <New key={ newId } id={ newId }/>
        }
      );
    }
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Новости</h1></div>
          { this.props.isLoading ? <div className="loading"></div> :  newsList }
        </div>
      </div>
    );
  }
}

NewsComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapStoreToProps = state => ({
  newsList: state.news.newsList,
  isLoading: state.news.isLoading,
  news: state.news.news,
  users: state.users.users,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(newsFetchData(url))
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(NewsComponent);
