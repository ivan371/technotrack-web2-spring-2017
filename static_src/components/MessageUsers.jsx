import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chatuserClose } from './../actions/chats';
import { Link } from 'react-router';
import { usersFetchData } from './../actions/users';


class MessageUsersComponent extends React.Component {
  state = {
    user: '',
  }
  componentDidMount() {
    this.props.fetchData('/api/users');
  }
  render() {
    const chatuserList = this.props.chat.map(
      (chatId) => {
        return (
          <div className="b-user-name" key={ chatId.id }>
            <Link to={'/vk/people/' + this.props.users[chatId.author].id + '/'}>
              <h3>
                { this.props.users[chatId.author].username}
              </h3>
            </Link>
          </div>
        );
      }
    );
    let select = [];
      for (let i in this.props.users) {
        select.push(
          <option key={ i } value={ this.props.users[i].id }>
           { this.props.users[i].username }
         </option>)
      }
      console.log(select);
    return (
      <div className="b-post">
        <Link to={'/vk/people/' + this.props.author + '/'}>
          <h3>
            { this.props.users[this.props.author].username}
          </h3>
        </Link>
        { chatuserList }
        <div className="button_field">
          <select>{select}</select>
          <button onClick={ this.props.chatuserClose.bind(this) }>Добавить друга</button>
        </div>
        <div className="button_field">
          <button onClick={ this.props.chatuserClose.bind(this) }>Закрыть</button>
        </div>
    </div>
    );
  }
}

MessageUsersComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapStoreToProps = state => ({
  chat: state.chats.chats[state.chats.chat].chatuser_set,
  users: state.users.users,
  author: state.chats.chats[state.chats.chat].author,
});
const mapDispatchToProps = dispatch => ({
  fetchData: (url) => dispatch(usersFetchData(url)),
  ...bindActionCreators({
    chatuserClose
  }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(MessageUsersComponent);
