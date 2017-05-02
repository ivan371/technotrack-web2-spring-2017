import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Post from './Post';

class NewComponent extends React.Component {

  render() {
    let neww = null;
    // console.log(this.props.objtype);
    switch (this.props.objtype) {
      case 'post':
        neww = 'post';
        break;
      case 'comment':
        neww = 'comment';
        break;
      case 'chat':
        neww = 'chat';
        break;
      case 'message':
        neww = 'message';
        break;
      case 'like':
        neww = 'like';
        break;
      default:

    }
    return (
      <div className="b-post">
        <h3>{ this.props.username }</h3>
        {neww}
        {/* {this.props.target} */}
       </div>
    );
  }
}

NewComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
};

const mapStoreToProps = (state, props) => ({
  objtype: state.news.news[props.id].objtype,
  username: state.users.users[state.news.news[props.id].author].username,
  target: state.news.news[props.id].target,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(NewComponent);
