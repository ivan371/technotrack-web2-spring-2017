import React from 'react';
import './../styles/base.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chatOpen, chatClose } from './../actions/chats';
import { Link } from 'react-router';


class GroupButtonComponent extends React.Component {
  render() {
      return  (<div className="chat_button">
          <Link to={"/vk/groups/" + this.props.id + '/'}><button
            key={ this.props.id }
            id={ this.props.id }>
        { this.props.content }</button></Link>
    </div>)
  }
};

GroupButtonComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
};

const mapStoreToProps = (state, props) => ({
  content: state.groups.groups[props.id].name,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(GroupButtonComponent);