import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class PostComponent extends React.Component {
  // onOpen = () => {
  //   this.props.onOpen(this.props.id)
  // }

  render() {
    // let openBut = null;
    // if (this.props.onOpen) {
    //   openBut = <div className="button_field">
    //     <button onClick={ this.onOpen } >Посмотреть пост</button></div>
    // }

    return (<div className="b-post">
            <h3>{ this.props.title }</h3>
            <div className="b-post__content">{ this.props.content }</div>
              <div className="b-user-name">
                <h3>{ this.props.firstname } { this.props.lastname }</h3>
              </div>
         </div>
    );
    //     { openBut }

  }
}

PostComponent.propTypes = {
  //  author: React.PropTypes.shape({
    // avaUrl: React.PropTypes.string,
    //  username: React.PropTypes.string,
  //  }).isRequired,
  id: React.PropTypes.number.isRequired,
  // title: React.PropTypes.string.isRequired,
  // content: React.PropTypes.string.isRequired,
  // onOpen: React.PropTypes.func,
};

const mapStoreToProps = (state, props) => ({
  title: state.posts.posts[props.id].title,
  content: state.posts.posts[props.id].content,
  firstname: state.posts.users[state.posts.posts[props.id].author].first_name,
  lastname: state.posts.users[state.posts.posts[props.id].author].last_name,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(PostComponent);
