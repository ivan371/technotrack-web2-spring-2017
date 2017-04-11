import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Post from './Post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPosts, loadPostsSuccess, loadPostsError } from './../actions/posts';
import { loadUser, loadUserSuccess, loadUserError } from './../actions/user';

class PostListComponent extends React.Component {
  componentDidMount() {
    this.props.loadPosts();
    let userId = null;
    // window.setTimeout(
    //   () => {
    //     this.props.loadPostsSuccess(apiResponse);
    //   },
    //   1000
    // );
    fetch('/api/posts', {
      credentials: "same-origin",
    })
    .then((resp) => resp.json())
    .then((data) => {
       this.props.loadPostsSuccess(data.results);
       if (data.results[0].author.id) {
         userId = data.results[0].author.id;
         this.props.loadUser();
          fetch('/api/users/' + userId, {
            credentials: "same-origin",
          }).then((resp) => resp.json())
          .then((newdata) => {
            console.log(newdata);
            this.props.loadUserSuccess(newdata);
          });
        }
      }
    ).catch(console.log);

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

// PostListComponent.propTypes = {
//   postList: React.PropTypes.arrayOf(React.PropTypes.shape(Post.PropTypes)),
//   isLoading: React.PropTypes.bool,
//   onPostOpen: React.PropTypes.func,
// };

const mapStoreToProps = state => ({
  postList: state.posts.postList,
  isLoading: state.posts.isLoading,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    loadPosts,
    loadPostsSuccess,
    loadPostsError,
    loadUserSuccess,
    loadUserError,
    loadUser}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(PostListComponent);
