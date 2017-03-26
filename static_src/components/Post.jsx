import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';


class PostComponent extends React.Component {
  render() {
    return (<div className="b-post">
            <h3>{ this.props.title }</h3>
              <img className="b-avatar"
                    width="40px"
                    height="40px"
                    alt="Аватарка не найдена"
                    src="">
              </img>
              <div className="b-user-name"></div>
            <div className="b-post__content">{ this.props.content }</div>
        </div>
    );
  }
}

PostComponent.propTypes = {
  //  author: React.PropTypes.shape({
    // avaUrl: React.PropTypes.string,
    //  username: React.PropTypes.string,
  //  }).isRequired,
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.string.isRequired,
};

export default PostComponent;
