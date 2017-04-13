import React from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import Modal from './Modal';
import Post from './Post';
import Profile from './Profile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUser, loadUserSuccess, loadUserError } from './../actions/users';

class SelfRoomComponent extends React.Component {

  componentDidMount() {
   this.props.loadUser();
    fetch('/api/users/?me', {
      credentials: "same-origin",
    }).then((resp) => resp.json())
    .then((newdata) => {
      console.log(newdata.results);
      this.props.loadUserSuccess(newdata.results);
    }).catch(console.log);
  }
  render() {
    let modalContent = null;
    let usercontent = <div className="loading"></div>;
    let model = null;
    if (this.props.modalopen) {
      model = <Modal />;
    }
    if (!this.props.ismeLoading) {
       usercontent = <Profile/>;
    }
    console.log(this.props.ismeLoading)
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
          { usercontent }
        </div>
      </div>
    );
  }
}

const mapStoreToProps = state => ({
  ismeLoading: state.users.ismeLoading,
  modalopen: state.posts.modalopen,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    loadUserSuccess,
    loadUserError,
    loadUser}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(SelfRoomComponent);
