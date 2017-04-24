import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postOpen } from './../actions/posts';


class PostComponent extends React.Component {

  render() {
    let changeable = null;
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
            <img className="like" src="http://127.0.0.1:8000/media/like.png"/>
          </div>
         </div>
    );
  }
}

PostComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
};

const mapStoreToProps = (state, props) => ({
  title: state.posts.posts[props.id].title,
  content: state.posts.posts[props.id].content,
  firstname: state.users.users[state.posts.posts[props.id].author].first_name,
  lastname: state.users.users[state.posts.posts[props.id].author].last_name,
  myid: state.users.myid,
  authorid: state.posts.posts[props.id].author
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({postOpen}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(PostComponent);
