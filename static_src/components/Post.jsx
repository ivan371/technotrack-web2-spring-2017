import React from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';


class PostComponent extends React.Component {
  render() {
    return (<div className="b-post">
            <div className="b-post__title">
              <img className="b-avatar"
                    width="40px"
                    height="40px"
                    alt="Аватарка не найдена"
                    src={ this.props.owner.avaUrl }>
              </img>
              <div className="b-user-name">{ this.props.owner.name }</div>
            <div className="b-post__content">{ this.props.content }</div>
          </div>
        </div>
    );
  }
}

PostComponent.propTypes = {
  owner: React.PropTypes.shape({
    avaUrl: React.PropTypes.string,
    name: React.PropTypes.string,
  }).isRequired,
  content: React.PropTypes.string.isRequired
};

export default PostComponent;

ReactDOM.render(
  <PostComponent />,
  document.getElementById('root'),
);
