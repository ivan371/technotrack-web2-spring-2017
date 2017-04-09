import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Post from './Post';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPosts, loadPostsSuccess, loadPostsError } from './../actions/posts';

const POST_LIST = {
  1: {id: 1, title: "sdf", content: "werwer"},
  2: {id: 2, title: "sdf", content: "werwer"},
};

const apiResponse = {
  postList: [1, 2],
  posts: POST_LIST,
}


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
      //  this.setState({ postList: data.results, isLoading: false });
      //  this.userId = this.state.postList[1].author;
      //  fetch('/api/users/' + this.userId, {
      //    credentials: "same-origin",
      //  }).then((resp) => resp.json())
      //  .then((newdata) => {
      //    this.setState({ user: newdata });
      //  });
      }
    ).catch(console.log);

  }
  render() {
      const postList = this.props.postList.map(
        (postId) => {
          return <Post key={ postId } id={ postId }/>
        }
        // (post) => {
        //   return <Post
        //       key={ post.id }
        //       id={ post.id }
        //       author={ post.author }
        //       content={ post.content }
        //       title={ post.title }
        //       onOpen={ this.props.onPostOpen }/>
        // }
      );
    return (
        <div className="b-post-list">
          { this.props.isLoading ? <div>Загрузка...</div> :  postList }
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
  ...bindActionCreators({loadPosts, loadPostsSuccess, loadPostsError}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(PostListComponent);
