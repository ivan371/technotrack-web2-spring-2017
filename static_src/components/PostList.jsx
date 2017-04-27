import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Post from './Post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postFetchData } from './../actions/posts';
import Pagination from 'react-js-pagination';

class PostListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 15
    };
  }
  componentDidMount() {
    this.props.fetchData('/api/posts');
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
  render() {
      const postList = this.props.postList.map(
        (postId) => {
          return <Post key={ postId } id={ postId }/>
        }
      );
    return (
        <div className="b-post-list">
          <Pagination
           activePage={this.state.activePage}
           itemsCountPerPage={10}
           totalItemsCount={40}
           pageRangeDisplayed={9}
           onChange={::this.handlePageChange}/>
          { this.props.isLoading ? <div className="loading"></div> :  postList }
        </div>
    );
  }
};

PostListComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
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
