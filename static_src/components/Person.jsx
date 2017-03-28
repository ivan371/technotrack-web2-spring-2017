import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';


class PersonComponent extends React.Component {

  render() {

    return (
      <div>
        <h3> { this.props.username } </h3>
      </div>
    );
  }
}

PersonComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
  username: React.PropTypes.string.isRequired,
};

export default PersonComponent;
