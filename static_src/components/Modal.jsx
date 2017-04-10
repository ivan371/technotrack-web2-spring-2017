import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postClose } from './../actions/posts';

class ModalComponent extends React.Component {
  render() {
    // if(!this.props.isOpen) {
    //   return null;
    // }
    return (
      <div className="b-modal_container">
        <div className="b-modal">
          <div className="b-post">
          <h3>{ this.props.title }</h3>
          <div className="b-post__content">{ this.props.content }</div>
            <Button bsStyle="primary" bsSize="large" block onClick={ this.props.postClose.bind() }>Закрыть</Button>
          </div>
        </div>
      </div>
    );
  }
}

// ModalComponent.defaultProps = {
//   isOpen: false,
// }

// ModalComponent.propTypes = {
//   inOpen: React.PropTypes.bool,
//   onClose: React.PropTypes.func.isRequired,
// }

const mapStoreToProps = state => ({
  title: state.posts.modalpost.title,
  content: state.posts.modalpost.content,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({postClose}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ModalComponent);
