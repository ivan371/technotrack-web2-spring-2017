import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class CommentComponent extends React.Component {

  render() {
    return (<div className="b-comment">
      <div className="button_field">
        <img className="like" src="http://127.0.0.1:8000/media/delete.png"/>
      </div>
        <h3>{this.props.author}</h3>
        <p>{this.props.text}</p>
        <div className="button_field">
          <img className="like" src="http://127.0.0.1:8000/media/like.png" />
        <div className="like_count"> <h4> { this.props.like_count } </h4>  </div>
    </div>
         </div>
    );
  }
}

CommentComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
};

const mapStoreToProps = (state, props) => ({
  text: state.comment.comments[props.id].text,
  author: state.users.users[state.comment.comments[props.id].author].username,
  like_count: state.comment.comments[props.id].like_count,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
  }, dispatch)
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(CommentComponent);
