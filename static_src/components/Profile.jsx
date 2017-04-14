import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ProfileComponent extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="b-post">
        <img className="avatar" src={ this.props.avatar }/>
        <p>{ this.props.username }</p>
        <p>{ this.props.email }</p>
        <p>{ this.props.firstname }</p>
        <p>{ this.props.lastname }</p>
        <p>{ this.props.rating }</p>
       </div>
    );
  }
}

const mapStoreToProps = (state, props) => ({
  username: state.users.users[0].username,
  email: state.users.users[0].email,
  firstname: state.users.users[0].first_name,
  lastname: state.users.users[0].last_name,
  rating: state.users.users[0].rating,
  avatar: state.users.users[0].avatar,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ProfileComponent);
