import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalUser } from './../actions/users';
import Modal from './Modal';

class ProfileComponent extends React.Component {
  render() {
    console.log('props',this.props);
    let model = null;
    const action = "MyPage";
    if (this.props.modalopen) {
      model = <Modal action={ action }/>;
    }
    return (
      <div className="b-post">
        <img className="avatar" src={ this.props.avatar }/>
        <p>{ this.props.username }</p>
        <p>{ this.props.email }</p>
        <p>{ this.props.firstname }</p>
        <p>{ this.props.lastname }</p>
        <p>{ this.props.rating }</p>
        <div className="button_field">
          <button onClick={ this.props.modalUser.bind(this) } >Изменить</button>
        </div>
        { model }
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
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({modalUser}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ProfileComponent);
