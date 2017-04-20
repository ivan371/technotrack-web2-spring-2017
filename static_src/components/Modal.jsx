import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PostChange from './PostChange';
import ProfileChange from './ProfileChange';

class ModalComponent extends React.Component {
  render() {
    let modal = null;
    switch (this.props.action) {
      case "PostChange":
          modal = <PostChange />;
        break;
      case "MyPage":
          modal = <ProfileChange/>;
        break;
      default:

    }
    return (
      <div>
      <div className="b-modal_container"></div>
        <div className="b-modal">
          { modal }
        </div>
    </div>
    );
  }
}

ModalComponent.PropTypes = {
  action: PropTypes.string.isRequired,
}

const mapStoreToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
  }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ModalComponent);
