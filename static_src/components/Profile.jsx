import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ProfileComponent extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="b-post">
        <p>{ this.props.username }</p>
        <p>{ this.props.email }</p>
        <p>{ this.props.firstname }</p>
        <p>{ this.props.lastname }</p>
        <p>{ this.props.rating }</p>
       </div>
    );
  }
}

ProfileComponent.propTypes = {
  // username: React.PropTypes.string.isRequired,
  // email: React.PropTypes.string.isRequired,
  // firstname: React.PropTypes.string.isRequired,
  // lastname: React.PropTypes.string.isRequired,
  // rating: React.PropTypes.number.isRequired,
  // id: React.PropTypes.number.isRequired,
};

const mapStoreToProps = (state, props) => ({
  username: state.users.users[0].username,
  email: state.users.users[0].email,
  firstname: state.users.users[0].first_name,
  lastname: state.users.users[0].last_name,
  rating: state.users.users[0].rating,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ProfileComponent);
