import React from 'react';

class ProfileComponent extends React.Component {
  render() {
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
  username: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
  firstname: React.PropTypes.string.isRequired,
  lastname: React.PropTypes.string.isRequired,
  rating: React.PropTypes.number.isRequired,
};

export default ProfileComponent;
