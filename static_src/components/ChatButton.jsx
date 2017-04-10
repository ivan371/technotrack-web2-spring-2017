import React from 'react';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chatOpen } from './../actions/chats';

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
        onClick={ this.props.chatOpen.bind(this.props.id) }
        block>
      { this.props.content }
        </Button>
  }
};

ChatButtonComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
  // content: React.PropTypes.string.isRequired,
  // onOpen: React.PropTypes.func,
};

const mapStoreToProps = (state, props) => ({
  content: state.chats.chats[props.id].name,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({chatOpen}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ChatButtonComponent);
