import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postClose, postChange } from './../actions/posts';

class ModalComponent extends React.Component {
  state = {
    title: this.props.title,
    content: this.props.content
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  postChange = (e) => {
    e.preventDefault();
    this.props.postChange(this.props.id, this.props.title, this.state.content);
  }
  render() {
    return (
      <div>
      <div className="b-modal_container"></div>
        <div className="b-modal">
          <div className="b-post">
          <h3><input
            value={ this.state.title }
            onChange={ this.onChange }
            name="title"></input></h3>
          <div className="b-post__content"><p>
            <input
              value={ this.state.content }
              onChange={ this.onChange }
              name="content"></input></p></div>
            <Button bsStyle="primary" bsSize="large" block onClick={ this.postChange.bind(this) }>Сохранить</Button>
            <Button bsStyle="primary" bsSize="large" block onClick={ this.props.postClose.bind() }>Закрыть</Button>
          </div>
        </div>
    </div>
    );
  }
}
const mapStoreToProps = state => ({
  title: state.posts.modalpost.title,
  content: state.posts.modalpost.content,
  id: state.posts.modalpost.id,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({postClose, postChange}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ModalComponent);
