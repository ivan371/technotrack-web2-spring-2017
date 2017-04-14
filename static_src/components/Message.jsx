import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class MessageComponent extends React.Component {

  render() {
    return (<div className="message b-post">
              <div className="b-user-name">
                <h3>{ this.props.username }</h3>
              </div>
              <p>{ this.props.content }</p>
            </div>
    );
  }
}

MessageComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
};

const mapStoreToProps = (state, props) => ({
  content: state.chats.messages[props.id].content,
  username: state.users.users[state.chats.messages[props.id].author].username,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(MessageComponent);
