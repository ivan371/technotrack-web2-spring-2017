import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Person from './Person';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadUsers, loadUsersSuccess, loadUsersError } from './../actions/users';

class PeopleComponent extends React.Component {
  componentDidMount() {
    this.props.loadUsers();
    let userId = null;
    fetch('/api/users', {
      credentials: "same-origin",
    })
    .then((resp) => resp.json())
    .then((data) => {
       this.props.loadUsersSuccess(data.results);
      }
    );

  }
  render() {
    let userList = [];
    if (!this.props.isLoading) {
      userList = this.props.userList.map(
        (userId) => {
          return <Person key={ userId } id={ userId }/>
        }
      );
    }
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Люди</h1></div>
          { this.props.isLoading ? <div>Загрузка...</div> :  userList }
        </div>
      </div>
    );
  }
}

const mapStoreToProps = state => ({
  userList: state.users.userList,
  isLoading: state.users.isLoading,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({loadUsers, loadUsersSuccess, loadUsersError }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(PeopleComponent);
