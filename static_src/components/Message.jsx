import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';


class MessageComponent extends React.Component {

  render() {
    return (<div className="message b-post">
              <div className="b-user-name">
                <Link to={'/vk/people/' + this.props.usId + '/'}><h3>{ this.props.username }</h3></Link>
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
  usId: state.chats.messages[props.id].author,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(MessageComponent);
