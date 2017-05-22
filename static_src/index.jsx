import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.css';
import { Provider } from 'react-redux';
import App from './components/app';
import SelfRoom from './components/SelfRoom';
import Layout from './components/Layout';
import Chats from './components/Chats';
import Groups from './components/Group';
import Friends from './components/Friends';
import News from './components/News';
import People from './components/People';
import User from './components/User';
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
    <Route path="/vk/self/page/:id/" component={SelfRoom}/>
    <Route path="/vk/chats/" component={Chats}/>
    <Route path="/vk/chats/:id/" component={Chats}/>
    <Route path="/vk/chats/:page/:id/" component={Chats}/>
    <Route path="/vk/people/:id/" component={User}/>
    <Route path="/vk/people/" component={People}/>
    <Route path="/vk/people/page/:id/" component={People}/>
    <Route path="/vk/news/" component={News}/>
    <Route path="/vk/news/page/:id/" component={News}/>
    <Route path="/vk/friends/" component={Friends}/>
    <Route path="/vk/friends/page/:id/" component={Friends}/>
    <Route path="/vk/user/" component={User}/>
    <Route path="/vk/groups/" component={Groups}/>
    <Route path="/vk/groups/:id/" component={Groups}/>
    <Route path="/vk/groups/:page/:id/" component={Groups}/>
  </Route></div>);

ReactDOM.render(
    <Provider store={ initStore() }>
      <Router history={history} routes={routers}/>
      {/* <App/> */}
     </Provider>,
  document.getElementById('root'),
);