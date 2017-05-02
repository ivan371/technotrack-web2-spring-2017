import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadFriend, loadFriendSuccess, loadFriendError } from './../actions/friend';
import { usersFetchData } from './../actions/friend';
import Page from './Page';
import Friend from './Friend';

class FriendsComponent extends React.Component {
  componentDidMount() {
    if(this.props.params.id != null) {
      this.props.fetchData('/api/friend/?offset=' + 10 * (parseInt(this.props.params.id) - 1));
    }
    else {
      this.props.fetchData('/api/friend');
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.params.id != this.props.params.id) {
      // this.props.load();
      this.props.fetchData('/api/friend/?offset=' + 10 * (parseInt(nextProps.params.id) - 1));
    }
  }
  render() {
    let friendList = [];
    if (!this.props.isLoading) {
      friendList = this.props.friendList.map(
        (friendId) => {
          return <Friend key={ friendId } id={ friendId } islist={true}/>
        }
      );
    }
    let pages = [];
    for(let i = 1; i <= this.props.count + 1; i++) {
      pages.push(<Page page={i} link={'/vk/frineds/page/' + i + '/'} key={i}/>);
    }
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Друзья</h1></div>
          <div className="paging">{pages}</div>
          { this.props.isLoading ? <div className="loading"></div> :  friendList }
        </div>
      </div>
    );
  }
}

FriendsComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapStoreToProps = state => ({
  friendList: state.friend.friendList,
  isLoading: state.friend.isLoading,
  count: state.friend.count,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(usersFetchData(url))
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(FriendsComponent);
