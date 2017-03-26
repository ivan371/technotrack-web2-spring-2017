import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Post from './Post';


class PostListComponent extends React.Component {
  render() {
      const postList = this.props.postList.map(
        (post) => {
          return <Post
              key={ post.id }
              author={ post.author }
              content={ post.content }
              title={ post.title }/>
        }
      );
    return (
        <div className="b-post-list">
          { this.props.isLoading ? <div>Загрузка...</div> :  postList }
        </div>
    );
  }
};

PostListComponent.propTypes = {
  postList: React.PropTypes.arrayOf(React.PropTypes.shape(Post.PropTypes)),
  isLoading: React.PropTypes.bool,
};

export default PostListComponent;
