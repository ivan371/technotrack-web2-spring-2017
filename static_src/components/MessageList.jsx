import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Message from './Message';

class MessageListComponent extends React.Component {
  state = {
    messageList: [],
    isLoading: true,
    isOpen: true,
  }
  componentDidMount() {
    console.log(this.props.id);
    fetch('/api/messages/?chat=' + this.props.id, {
      credentials: "same-origin",
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data.results);
      this.setState({ messageList: data.results, isLoading: false });
    }
  ).catch(console.log);

  }
  render() {
    let messageList = null;
    if (this.state.isLoading === false) {
      messageList = this.state.messageList.map(
        (message) => {
          return <Message
              key={ message.id }
              id={ message.id }
              content={ message.content }
              />
        }
      );
      this.state.isOpen = false;
    }
    return (
      <div>
        <Col xs={4} className="list">
          { this.state.isOpen ? <div>Загрузка...</div> :  messageList }
      </Col>
      </div>
    );
  }
}

MessageListComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
};

export default MessageListComponent;
