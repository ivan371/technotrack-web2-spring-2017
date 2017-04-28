import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { newsFetchData, loadNews } from './../actions/news';
import { connect } from 'react-redux';
import New from './New';
import Post from './Post';
import Message from './Message';
import ChatButton from './ChatButton';
import { Link } from 'react-router';
import Page from './Page';

class NewsComponent extends React.Component {
  componentDidMount() {
    if(this.props.params.id != null) {
      this.props.fetchData('/api/events/?offset=' + 10 * (parseInt(this.props.params.id) - 1));
    }
    else {
      this.props.fetchData('/api/events');
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.params.id != this.props.params.id) {
      this.props.load();
      this.props.fetchData('/api/events/?offset=' + 10 * (parseInt(nextProps.params.id) - 1));
    }
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
                    <h3>
                      <Link to={ '/vk/people/' + this.props.users[this.props.news[newId].author].id + '/' }>
                        { this.props.users[this.props.news[newId].author].username }
                      </Link> создал пост
                    </h3>
                  </div>
                  <Post id={ this.props.news[newId].target }/>
                </div>);
              break;
            case 'chat':
                return (<div key={ newId }>
                  <div className="b-post_dark">
                    <h3>
                      <Link to={ '/vk/people/' + this.props.users[this.props.news[newId].author].id + '/' }>
                        { this.props.users[this.props.news[newId].author].username }
                      </Link> создал чат</h3>
                  </div>
                  <ChatButton id={ this.props.news[newId].target }/>
                </div>);
              break;
            case 'message':
                return (<div key={ newId }>
                  <div className="b-post_dark">
                    <h3>
                      <Link to={ '/vk/people/' + this.props.users[this.props.news[newId].author].id + '/' }>
                        { this.props.users[this.props.news[newId].author].username }
                      </Link> написал сообщение</h3>
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
    let pages = [];
    for(let i = 1; i <= this.props.count + 1; i++) {
      pages.push(<Page page={i} link={'/vk/news/page/' + i + '/'} key={i}/>);
    }
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Новости</h1></div>
          <div className="paging">
            {pages}
          </div>
          { this.props.isLoading ? <div className="loading"></div> :  newsList }
        </div>
      </div>
    );
  }
}

NewsComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
};

const mapStoreToProps = state => ({
  newsList: state.news.newsList,
  isLoading: state.news.isLoading,
  news: state.news.news,
  users: state.users.users,
  count: state.news.count,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(newsFetchData(url)),
    load: () => dispatch(loadNews()),
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(NewsComponent);
