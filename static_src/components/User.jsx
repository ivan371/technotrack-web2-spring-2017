import React, { Component, PropTypes } from 'react';
import UserPostList from './UserPostList';
import PostForm from './PostForm';
import Modal from './Modal';
import Post from './Post';
import Profile from './Profile';
import Person from './Person';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userFetchData } from './../actions/users';

class UserComponent extends React.Component {
  componentDidMount() {
    console.log('prop;', this.props.params.id);
    this.props.fetchData('/api/users/' + this.props.params.id + '/');
  }
  render() {
    console.log(this.props.ismeLoading);
    let usercontent = null;
    const numid = parseInt(this.props.params.id);
    usercontent = <Person key={ numid } id={ numid } islist={ false }/>;
    return (
      <div>
        <div className="box">

          <div className="b-post"><h1>Посты пользователя</h1></div>

           <UserPostList onPostOpen={ this.onPostOpen } id={ this.props.params.id}/>

           </div>
        <div className="box">
          <div className="b-post"><h1>Профиль</h1></div>
          { usercontent }
        </div>
      </div>
    );
  }
}
UserComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
};


const mapStoreToProps = state => ({
  ismeLoading: state.users.ismeLoading,
  // modalopen: state.posts.modalopen,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(userFetchData(url))
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(UserComponent);
