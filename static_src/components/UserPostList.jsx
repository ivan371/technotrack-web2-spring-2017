import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Post from './Post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postFetchData } from './../actions/posts';

class UserPostListComponent extends React.Component {
  componentDidMount() {
    this.props.fetchData('/api/posts/?author=' + this.props.id);
  }
  render() {
      const postList = this.props.postList.map(
        (postId) => {
          return <Post key={ postId } id={ postId }/>
        }
      );
    return (
        <div className="b-post-list">
          { this.props.isLoading ? <div className="loading"></div> :  postList }
        </div>
    );
  }
};

UserPostListComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
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
)(UserPostListComponent);
