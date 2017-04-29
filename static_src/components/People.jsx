import React, { Component, PropTypes } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Person from './Person';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { usersFetchData } from './../actions/users';
import Page from './Page';

class PeopleComponent extends React.Component {
  componentDidMount() {
    if(this.props.params.id != null) {
      this.props.fetchData('/api/users/?offset=' + 10 * (parseInt(this.props.params.id) - 1));
    }
    else {
      this.props.fetchData('/api/users');
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.params.id != this.props.params.id) {
      // this.props.load();
      this.props.fetchData('/api/users/?offset=' + 10 * (parseInt(nextProps.params.id) - 1));
    }
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
    let pages = [];
    for(let i = 1; i <= this.props.count + 1; i++) {
      pages.push(<Page page={i} link={'/vk/people/page/' + i + '/'} key={i}/>);
    }
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Люди</h1></div>
          <div className="paging">{pages}</div>
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
  count: state.users.count,
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
