import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './../styles/base.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class PageComponent extends React.Component {
  render() {
    return (
        <div className="page">
          <Link to={'/vk/self/page/' + this.props.page + '/'}><button>{this.props.page}</button></Link>
        </div>
    );
  }
};

PageComponent.propTypes = {
  page: PropTypes.number.isRequired,
};

const mapStoreToProps = state => ({
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({}, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(PageComponent);
