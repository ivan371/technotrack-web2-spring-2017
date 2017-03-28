import React from 'react';
import Col from 'react-bootstrap/lib/Col';

class FriendComponent extends React.Component {
  render() {
    return (
      <div>
        <Col xs={4} className="list">
        Друзья
      </Col>
      </div>
    );
  }
}

export default FriendComponent;
