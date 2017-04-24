import React, { Component, PropTypes } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Person from './Person';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { usersFetchData } from './../actions/users';

class PeopleComponent extends React.Component {
  componentDidMount() {
    this.props.fetchData('/api/users');
  }
  render() {
    let userList = [];
    if (!this.props.isLoading) {
      userList = this.props.userList.map(
        (userId) => {
          return <Person key={ userId } id={ userId } islist={true}/>
        }
      );
    }
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Люди</h1></div>
          { this.props.isLoading ? <div className="loading"></div> :  userList }
        </div>
      </div>
    );
  }
}

PeopleComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapStoreToProps = state => ({
  userList: state.users.userList,
  isLoading: state.users.isLoading,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(usersFetchData(url))
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(PeopleComponent);
