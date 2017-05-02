import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Comment from './Comment';
import {createCommentFetchData} from './../actions/posts';

class CommentListComponent extends React.Component {
  state = {
    text: '',
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onCreate = (e) => {
    e.preventDefault();
    this.setState({text: ''});
    this.props.fetchData('/api/comments/?post=' + this.props.id, this.state.text);
  }
  render() {
    const commentlist = this.props.comments.map(
      (commentId) => {
        return <Comment key={ commentId } id={commentId}/>
      }
    );
    return (
        <div>
          {commentlist}
          <div className="b-comment">
            <textarea
              className="area"
              value={ this.state.text }
              onChange={ this.onChange }
              name="text"
              placeholder="Введите комментарий">
            </textarea>
            <div className="button_field">
              <button onClick={ this.onCreate.bind(this) }>Создать</button>
            </div>
        </div>
        </div>
    );
  }
};

CommentListComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
  fetchData: PropTypes.func.isRequired,

};

const mapStoreToProps = (state, props) => ({
  comments: state.posts.posts[props.id].comment_set,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
    fetchData: (url, text) => dispatch(createCommentFetchData(url, text))
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(CommentListComponent);
