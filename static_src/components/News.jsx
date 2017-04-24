import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { newsFetchData } from './../actions/news';
import { connect } from 'react-redux';
import New from './New';

class NewsComponent extends React.Component {
  componentDidMount() {
    this.props.fetchData('/api/events');
  }
  render() {
    let newsList = [];
    if (!this.props.isLoading) {
      newsList = this.props.newsList.map(
        (newId) => {
          return <New key={ newId } id={ newId }/>
        }
      );
    }
    return (
      <div>
        <div className="box">
          <div className="b-post"><h1>Новости</h1></div>
          { this.props.isLoading ? <div className="loading"></div> :  newsList }
        </div>
      </div>
    );
  }
}

NewsComponent.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

const mapStoreToProps = state => ({
  newsList: state.news.newsList,
  isLoading: state.news.isLoading,
});
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(newsFetchData(url))
  };
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(NewsComponent);
