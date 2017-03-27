import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import Modal from './Modal';
import Post from './Post';



class SelfRoomComponent extends React.Component {
  state = {
    postList: [],
    isLoading: false,
    isOpen: false,
    postId: null,
  }
  onCreate = (post) => {
    this.setState({
      postList: [post, ...this.state.postList]
    });
  }

  onCloseModel = () => {
    this.setState({ isOpen: false });
  }

  onPostOpen = (postId) => {
    this.setState({
      postId,
      isOpen: true,
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('/api/posts', {
      credentials: "same-origin",
    })
    .then((resp) => resp.json())
    .then((data) => {
       this.setState({ postList: data.results, isLoading: false });
      }
    )
  }
  render() {
    let modalContent = null;
    if (this.state.postId !== null) {
      const postInfo = this.state.postList.find((value) => value.id == this.state.postId);
      modalContent = <Post { ...postInfo } />
    }
    return (
      <div>
        <h1>Лента постов</h1>
        <PostForm onCreate={ this.onCreate }/>
        <PostList isLoading={ this.state.isLoading } postList={ this.state.postList } onPostOpen={ this.onPostOpen }/>
        <Modal isOpen={ this.state.isOpen } onClose={ this.onCloseModel }>{ modalContent }</Modal>
      </div>
    );
  }
}


export default SelfRoomComponent;
