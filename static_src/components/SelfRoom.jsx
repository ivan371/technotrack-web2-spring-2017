import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import Modal from './Modal';
import Post from './Post';
import Profile from './Profile';
import Col from 'react-bootstrap/lib/Col';

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

  componentDidMount() {
    this.setState({ isLoading: true });
    let userId = null;
    fetch('/api/posts', {
      credentials: "same-origin",
    })
    .then((resp) => resp.json())
    .then((data) => {
       this.setState({ postList: data.results, isLoading: false });
       this.userId = this.state.postList[1].author;
       fetch('/api/users/' + this.userId, {
         credentials: "same-origin",
       }).then((resp) => resp.json())
       .then((newdata) => {
         this.setState({ user: newdata });
       });
      }
    ).catch(alert);

  }
  render() {
    let modalContent = null;
    let usercontent = true;
    let profile = null;
    if (this.state.postId !== null) {
      const postInfo = this.state.postList.find((value) => value.id == this.state.postId);
      modalContent = <Post { ...postInfo } />
    }
    if (this.state.user !== null) {
      profile =  <Profile
            username={ this.state.user.username }
            email={ this.state.user.email }
            lastname={ this.state.user.last_name }
            firstname={ this.state.user.first_name }
            rating={ this.state.user.rating }/>;
          usercontent = false;
    }
    return (
      <div>
        <Col xs={4} className="list">
          <h1>Лента постов</h1>
          <PostForm onCreate={ this.onCreate }/>
          <PostList isLoading={ this.state.isLoading } postList={ this.state.postList } onPostOpen={ this.onPostOpen }/>
          <Modal isOpen={ this.state.isOpen } onClose={ this.onCloseModel }>{ modalContent }</Modal>
        </Col>
        <Col xs={4} className="list">
          <h1>Моя страница</h1>
          { usercontent ? <div>Загрузка...</div> :  profile }
        </Col>
      </div>
    );
  }
}


export default SelfRoomComponent;
