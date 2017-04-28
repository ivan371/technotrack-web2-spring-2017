import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Post from './Post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postFetchData } from './../actions/posts';
import Page from './Page';
import {Link} from 'react-router';

class PostListComponent extends React.Component {
  componentDidMount() {
    if(this.props.page != null) {
      this.props.fetchData('/api/posts/?offset=' + 10 * (parseInt(this.props.page) - 1));
    }
    else {
      this.props.fetchData('/api/posts');
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.page != this.props.page) {
      this.props.fetchData('/api/posts/?offset=' + 10 * (parseInt(nextProps.page) - 1));
    }
  }
  render() {
      const postList = this.props.postList.map(
        (postId) => {
          return <Post key={ postId } id={ postId }/>
        }
      );
    return (
        <div className="b-post-list">
          <div className="paging">
            <Page page={1}/>
            <Page page={2}/>
          </div>
           { this.props.isLoading ? <div className="loading"></div> :  postList }
        </div>
    );
  }
};

PostListComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
  page: PropTypes.string
};

const mapStoreToProps = state => ({
  postList: state.posts.postList,
  isLoading: state.posts.isLoading,
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
