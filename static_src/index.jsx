import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.css';
import './styles/bootstrap.css';
import { Provider } from 'react-redux';
import App from './components/app';
import initStore from './store';


ReactDOM.render(
    <Provider store={ initStore() }>
        <App />
    </Provider>,
  document.getElementById('root'),
);
