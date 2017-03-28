import React from 'react';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';

class ChatButtonComponent extends React.Component {
  onOpen = (e) => {
    this.props.onOpen(this.props.id);
    e.preventDefault;
    // console.log(e);
  }
  render() {
      return <Button
        key={ this.props.id }
        id={ this.props.id }
        bsStyle="primary"
        bsSize="large"
        onClick={ this.onOpen }
        block
      >
      { this.props.content }
        </Button>
  }
};

ChatButtonComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
  content: React.PropTypes.string.isRequired,
  onOpen: React.PropTypes.func,
};

export default ChatButtonComponent;
