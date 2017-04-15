import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postOpen } from './../actions/posts';


class PostChangeComponent extends React.Component {

  render() {
    return (<div className="b-post">
            <h3><input>{ this.props.title }</input></h3>
            <div className="b-post__content"><input>{ this.props.content }</input></div>
              <div className="button_field">
                <button >Сохранить</button>
            </div>
         </div>
    );
  }
}

PostChangeComponent.propTypes = {
  id: React.PropTypes.number.isRequired,
};

const mapStoreToProps = (state, props) => ({
  title: state.posts.posts[props.id].title,
  content: state.posts.posts[props.id].content,
  firstname: state.users.users[state.posts.posts[props.id].author].first_name,
  lastname: state.users.users[state.posts.posts[props.id].author].last_name,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({postOpen}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(PostChangeComponent);
