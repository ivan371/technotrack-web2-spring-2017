import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalUser, modalClose, updateProfileFetchData } from './../actions/users';

class ProfileChangeComponent extends React.Component {
  state = {
    username: this.props.username,
    email: this.props.email,
    firstname: this.props.firstname,
    lastname: this.props.lastname,
    rating: this.props.rating,
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  profileChange = (e) => {
    e.preventDefault();
    this.props.fetchData('/api/users/', this.props.id, {
      username: this.state.username,
      email: this.state.email,
      first_name: this.state.firstname,
      last_name: this.state.lastname,
      rating: this.state.rating,
    });
  }
  render() {
    console.log('props',this.props);
    let model = null;
    return (
      <div className="b-post">
        <img className="avatar" src={ this.props.avatar }/>
        <p><input
          value={ this.state.username }
          onChange={ this.onChange }
          name="username"></input></p>
        <p><input
          value={ this.state.email }
          onChange={ this.onChange }
          name="email"></input></p>
        <p><input
          value={ this.state.firstname }
          onChange={ this.onChange }
          name="firstname"></input></p>
        <p><input
          value={ this.state.lastname }
          onChange={ this.onChange }
          name="lastname"></input></p>
        <p><input
          value={ this.state.rating }
          onChange={ this.onChange }
          name="rating"></input></p>
        <div className="button_field">
          <button onClick={ this.profileChange.bind(this) } >Сохранить</button>
        </div>
        <div className="button_field">
          <button onClick={ this.props.modalClose.bind(this) } >Закрыть</button>
        </div>
       </div>
    );
  }
}

const mapStoreToProps = (state, props) => ({
  username: state.users.users[state.users.myid].username,
  email: state.users.users[state.users.myid].email,
  firstname: state.users.users[state.users.myid].first_name,
  lastname: state.users.users[state.users.myid].last_name,
  rating: state.users.users[state.users.myid].rating,
  avatar: state.users.users[state.users.myid].avatar,
  modalopen: state.users.modalopen,
  id: state.users.myid,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({modalUser, modalClose}, dispatch),
  fetchData: (url, id, data) => dispatch(updateProfileFetchData(url, id, data))
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ProfileChangeComponent);
