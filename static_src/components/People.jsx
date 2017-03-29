import React from 'react';
import Col from 'react-bootstrap/lib/Col';
import Profile from './Profile';
// import Modal from 'react-bootstrap/lib/Modal';

class PeopleComponent extends React.Component {
  state = {
    userList: [],
    isLoading: true,
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    let userId = null;
    fetch('/api/users', {
      credentials: "same-origin",
    })
    .then((resp) => resp.json())
    .then((data) => {
       this.setState({ userList: data.results, isLoading: false });
      }
    );

  }
  render() {
    let userList = [];
    if (!this.state.isLoading) {
      userList = this.state.userList.map(
        (user) => {
          return(
            <Profile
                key={ user.id }
                username={ user.username }
                email={ user.email }
                lastname={ user.last_name }
                firstname={ user.first_name }
                rating={ user.rating }/>)
          }
      );
    }
    console.log(userList);
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Люди</h1></div>
          { this.state.isLoading ? <div>Загрузка...</div> :  userList }
        </div>
      </div>
    );
  }
}

export default PeopleComponent;
