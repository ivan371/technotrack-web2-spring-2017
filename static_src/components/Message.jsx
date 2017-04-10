import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class MessageComponent extends React.Component {

  render() {
    return (<div className="message">
              <h3>{ this.props.content }</h3>
            </div>
    );
  }
}

MessageComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
};

const mapStoreToProps = (state, props) => ({
  content: state.chats.messages[props.id].content,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(MessageComponent);
