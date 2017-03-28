import React from 'react';
import Col from 'react-bootstrap/lib/Col';

class NewsComponent extends React.Component {
  render() {
    return (
      <div>
        <Col xs={4} className="list">
          новости
        </Col>
      </div>
    );
  }
}

export default NewsComponent;
