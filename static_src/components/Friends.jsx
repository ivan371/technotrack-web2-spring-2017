import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadFriend, loadFriendSuccess, loadFriendError } from './../actions/friend';

class FriendComponent extends React.Component {
  render() {
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Друзья</h1></div>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(FriendComponent);
