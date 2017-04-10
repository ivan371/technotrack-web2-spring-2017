import React from 'react';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chatOpen, chatClose } from './../actions/chats';


class ChatButtonComponent extends React.Component {
  onOpen = (e) => {
    this.props.onOpen(this.props.id);
    e.preventDefault;
    // console.log(e);
  }
  click = () => {
    this.props.chatClose();
    this.props.chatOpen(this.props.id);
  }
  render() {
      return <Button
        key={ this.props.id }
        id={ this.props.id }
        bsStyle="primary"
        bsSize="large"
        onClick={ this.click.bind(this) }
        block>
      { this.props.content }
        </Button>
  }
};

ChatButtonComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
};

const mapStoreToProps = (state, props) => ({
  content: state.chats.chats[props.id].name,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({chatOpen,chatClose}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ChatButtonComponent);
