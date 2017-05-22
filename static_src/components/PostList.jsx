import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Post from './Post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postFetchData } from './../actions/posts';
import Page from './Page';
import {Link} from 'react-router';
import PostSearch from './PostSearch';

class PostListComponent extends React.Component {
  componentDidMount() {
    if(this.props.page != null) {
      this.props.fetchData(this.props.link + 'offset=' + 10 * (parseInt(this.props.page || 1) - 1));
    }
    else {
      this.props.fetchData(this.props.link);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.page != this.props.page) {
      this.props.fetchData(this.props.link + 'offset=' + 10 * (parseInt(nextProps.page) - 1));
    }
    if(nextProps.link != this.props.link) {
      this.props.fetchData(nextProps.link + 'offset=' + 10 * (parseInt(this.props.page) - 1 || 0));
    }
  }
  render() {
      const postList = this.props.postList.map(
        (postId) => {
          return <Post key={ postId } id={ postId }/>
        }
      );
      let pages = [];
      for(let i = 1; i <= this.props.count + 1; i++) {
        pages.push(<Page page={i} link={'/vk/self/page/' + i + '/'} key={i}/>);
      }
    return (
        <div className="b-post-list">
          <PostSearch url={'/ugc/posts/'}/>
          <div className="paging">
            {pages}
          </div>
           { this.props.isLoading ? <div className="loading"></div> :  postList }
        </div>
    );
  }
};

PostListComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
  link: PropTypes.string,
  page: PropTypes.string
};

const mapStoreToProps = state => ({
  postList: state.posts.postList,
  isLoading: state.posts.isLoading,
  count: state.posts.count,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(postFetchData(url))
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(PostListComponent);
