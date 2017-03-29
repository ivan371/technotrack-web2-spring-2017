import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import Button from 'react-bootstrap/lib/Button';


class PostComponent extends React.Component {
  onOpen = () => {
    this.props.onOpen(this.props.id)
  }

  render() {
    let openBut = null;
    if (this.props.onOpen) {
      openBut = <div className="button_field">
        <button onClick={ this.onOpen } >Посмотреть пост</button></div>
    }

    return (<div className="b-post">
            <h3>{ this.props.title }</h3>
              <div className="b-user-name"></div>
            <div className="b-post__content">{ this.props.content }</div>
            { openBut }
        </div>
    );
  }
}

PostComponent.propTypes = {
  //  author: React.PropTypes.shape({
    // avaUrl: React.PropTypes.string,
    //  username: React.PropTypes.string,
  //  }).isRequired,
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
  onOpen: React.PropTypes.func,
};

export default PostComponent;
