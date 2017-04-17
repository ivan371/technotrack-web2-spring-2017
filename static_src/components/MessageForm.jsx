import React from 'react';
import './../styles/base.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { messageCreate } from './../actions/chats';

class MessageFormComponent extends React.Component {
  state = {
    content: '',
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onCreate = (e) => {
    e.preventDefault();
    this.setState({content: ''});
    this.props.messageCreate(this.props.chat, this.state.content);
  }
  render() {
    return (
      <div className="b-post">
        <div>
        <textarea
          placeholder="Введите сообщение"
          className="area"
          value={ this.state.content }
          onChange={ this.onChange }
          name="content"></textarea>
      </div>
        <div className="button_field">
          <button onClick={ this.onCreate.bind(this) }>Отправить</button>
      </div>
       </div>
    );
  }
}

MessageFormComponent.propTypes = {
  // id: React.PropTypes.number.isRequired,
};

const mapStoreToProps = (state, props) => ({
  chat: state.chats.chat,
  // email: state.users.users[props.id].email,
  // firstname: state.users.users[props.id].first_name,
  // lastname: state.users.users[props.id].last_name,
  // rating: state.users.users[props.id].rating,
  // avatar: state.users.users[props.id].avatar,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({messageCreate}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(MessageFormComponent);