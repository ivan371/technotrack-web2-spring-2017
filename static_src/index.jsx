import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.css';
import './styles/bootstrap.css';
import { Grid, Col } from 'react-bootstrap';
// import Grid from 'react-bootstrap/lib/Grid'
//import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Button from 'react-bootstrap/lib/Button';
import SelfRoom from './components/SelfRoom';
import Layout from './components/Layout';
import Chats from './components/Chats';
import Friends from './components/Friends';
import News from './components/News';
import People from './components/People';

class AppComponent extends React.Component {
  state = {
    currentPageName: "self_room",
  }

  onMenuSelect = (currentMenu) => {
    this.setState({ currentPageName: currentMenu });
  }

  render() {
    let page = null;
    switch (this.state.currentPageName) {
      case 'self_room':
        page = <SelfRoom />
        break;
      case 'news':
        page = <News />
        break;
      case 'friends':
        page = <Friends />
        break;
      case 'chats':
        page = <Chats />
        break;
      case 'peoples':
        page = <People />
        break;
    }
    return (
      <div className="main">
        <div className="back"></div>
        <Layout onSelect={ this.onMenuSelect }>
               { page }
        </Layout>
      </div>
      );
  }
}

ReactDOM.render(
  <AppComponent />,
  document.getElementById('root'),
);
