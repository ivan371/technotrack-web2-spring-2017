import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postOpen } from './../actions/posts';
import { likeFetchData } from './../actions/like';
import CommentList from './CommentList';

class PostComponent extends React.Component {
  likeChange = (e) => {
    e.preventDefault();
    this.props.fetchData('/api/likes/?type=post&&id='+ this.props.id, this.props.id);
  }

  commentOpen = () => {
    this.setState({isCommentOpen: true});
  }

  commentClose = () => {
    this.setState({isCommentOpen: false});
  }

  state = {
    isCommentOpen: false,
  }

  render() {
    let changeable = null;
    let commentList = null;
    let commentbutton = null;
    if (this.state.isCommentOpen) {
      commentbutton =  <div className="button_field">
                        <button onClick={this.commentClose}>Скрыть комменты</button>
                      </div>
      commentList = <CommentList id={this.props.id}/>
    }
    else {
      commentbutton =  <div className="button_field">
                        <button onClick={this.commentOpen}>Показать комменты</button>
                      </div>
    }
    if(this.props.myid == this.props.authorid) {
      changeable = <div className="button_field">
        <button onClick={ this.props.postOpen.bind(this, this.props.id) } >Изменить</button>
    </div>;
    }
    return (<div className="b-post">
            <h3>{ this.props.title }</h3>
            <div className="b-post__content">{ this.props.content }</div>
              <div className="b-user-name">
                <h3>{ this.props.firstname } { this.props.lastname }</h3>
              </div>
              { changeable }
              <div className="button_field">
                <img className="like" src="http://127.0.0.1:8000/media/like.png" onClick={ this.likeChange.bind(this) }/>
              <div className="like_count"> <h4> { this.props.like_count } </h4>  </div>
          </div>
        {commentbutton}
        {commentList}
         </div>
    );
  }
}

PostComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
  fetchData: PropTypes.func.isRequired,
};

const mapStoreToProps = (state, props) => ({
  title: state.posts.posts[props.id].title,
  content: state.posts.posts[props.id].content,
  like_count: state.posts.posts[props.id].like_count,
  firstname: state.users.users[state.posts.posts[props.id].author].first_name,
  lastname: state.users.users[state.posts.posts[props.id].author].last_name,
  myid: state.users.myid,
  authorid: state.posts.posts[props.id].author,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    postOpen,
  }, dispatch),
  fetchData: (url, id) => dispatch(likeFetchData(url, id))
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(PostComponent);
