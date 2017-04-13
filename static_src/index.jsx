import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.css';
import { Provider } from 'react-redux';
import App from './components/app';
import SelfRoom from './components/SelfRoom';
import Layout from './components/Layout';
import Chats from './components/Chats';
import Friends from './components/Friends';
import News from './components/News';
import People from './components/People';
import initStore from './store';
import { createStore, combineReducers } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import reducers from './reducers';
// import { createBrowserHistory } from 'history';
//
const history = syncHistoryWithStore(browserHistory, initStore());

const routers =
( <div><Route path="vk/" component={App}>
  <Route path="/vk/self/" component={SelfRoom}/>
    <Route path="/vk/chats/" component={Chats}/>
    <Route path="/vk/people/" component={People}/>
    <Route path="/vk/news/" component={News}/>
    <Route path="/vk/friends/" component={Friends}/>
  </Route></div>);

ReactDOM.render(
    <Provider store={ initStore() }>
      <Router history={history} routes={routers}/>
      {/* <App/> */}
     </Provider>,
  document.getElementById('root'),
);
