import React, { Component, PropTypes } from 'react';
import PostList from './PostList';
import PostForm from './PostForm';
import Modal from './Modal';
import Post from './Post';
import Profile from './Profile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userFetchData } from './../actions/users';

class SelfRoomComponent extends React.Component {

  componentDidMount() {
    this.props.fetchData('/api/users/?me');
  }
  render() {
    let modalContent = null;
    let usercontent = <div className="loading"></div>;
    let model = null;
    let page = null;
    if(this.props.params.hasOwnProperty('id')) {
      page = this.props.params.id;
    }
    if (this.props.modalopen) {
      model = <Modal action="PostChange"/>;
    }
    if (!this.props.ismeLoading) {
       usercontent = <Profile/>;
    }
    console.log(this.props.ismeLoading)
    return (
      <div>
        <div className="box">

          <div className="b-post"><h1>Лента постов</h1></div>

           <PostForm onCreate={ this.onCreate } link={'/api/posts/'}/>
           <PostList onPostOpen={ this.onPostOpen } page={page} link={'/api/posts/?&&'}/>
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

SelfRoomComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapStoreToProps = state => ({
  ismeLoading: state.users.ismeLoading,
  modalopen: state.posts.modalopen,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(userFetchData(url))
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(SelfRoomComponent);
