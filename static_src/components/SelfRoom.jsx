import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import Modal from './Modal';
import Post from './Post';
import Profile from './Profile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SelfRoomComponent extends React.Component {
  state = {
    postList: [],
    isLoading: false,
    isOpen: false,
    postId: null,
    user: null,
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

  render() {
    let modalContent = null;
    let usercontent = true;
    //  <Modal isOpen={ this.state.isOpen } onClose={ this.onCloseModel }>{ modalContent }</Modal>
    // if (this.state.postId !== null) {
    //   const postInfo = this.state.postList.find((value) => value.id == this.state.postId);
    //   modalContent = <Post { ...postInfo } />
    // }
    // if (this.props.user !== null) {
    // }
    let model = null;
    if (this.props.modalopen) {
      model = <Modal />;
    }

    return (
      <div>
        <div className="box">

          <div className="b-post"><h1>Лента постов</h1></div>

           <PostForm onCreate={ this.onCreate }/>
           <PostList onPostOpen={ this.onPostOpen }/>
          { model }


        </div>
        <div className="box">
          <div className="b-post"><h1>Моя страница</h1></div>
          <Profile />
          { this.props.isLoading ? <div>Загрузка...</div> :  <Profile /> }
        </div>
      </div>
    );
  }
}

const mapStoreToProps = state => ({
  user: state.user.user,
  isLoading: state.user.isLoading,
  modalopen: state.posts.modalopen,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(SelfRoomComponent);
