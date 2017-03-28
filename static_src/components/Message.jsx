import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';


class MessageComponent extends React.Component {

  render() {
    return (<div className="message">
              <h3>{ this.props.content }</h3>
            </div>
    );
  }
}

MessageComponent.propTypes = {
  message: React.PropTypes.string.isRequired,
  // author: React.PropTypes.string.isRequired,
};

export default MessageComponent;
