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

const mapStoreToProps = state => ({
  username: state.user.user.username,
  email: state.user.user.email,
  firstname: state.user.user.first_name,
  lastname: state.user.user.last_name,
  rating: state.user.user.rating,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ProfileComponent);
