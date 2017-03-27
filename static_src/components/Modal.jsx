import React from 'react';
import Button from 'react-bootstrap/lib/Button';

class ModalComponent extends React.Component {
  render() {
    if(!this.props.isOpen) {
      return null;
    }
    return (
      <div className="b-modal_container">
        <div className="b-modal">
          { this.props.children }
            <Button bsStyle="primary" bsSize="large" block onClick={ this.props.onClose }>Закрыть</Button>
        </div>
      </div>
    );
  }
}

ModalComponent.defaultProps = {
  isOpen: false,
}

ModalComponent.propTypes = {
  inOpen: React.PropTypes.bool,
  onClose: React.PropTypes.func.isRequired,
}


export default ModalComponent;
