import React from 'react';
import './../styles/base.css';
import "./../styles/bootstrap.css";
import { Grid, Col } from 'react-bootstrap';
import SelfRoom from './SelfRoom';
import Layout from './Layout';
import Chats from './Chats';
import Friends from './Friends';
import News from './News';
import People from './People';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectPage } from './../actions/routing';

class AppComponent extends React.Component {
  onMenuSelect = (currentMenu) => {
    this.props.selectPage(currentMenu);
  };

  render() {
    return (
      <div className="main">
        <div className="back"></div>
        <Layout onSelect={ this.onMenuSelect }>
               { this.props.children }
        </Layout>
      </div>
      );
  }
}

const mapStoreToProps = state => ({
  currentPage: state.router.currentPage,
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ selectPage }, dispatch),
});

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(AppComponent);
