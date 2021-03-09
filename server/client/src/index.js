import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
// Code for testing POST requests
import axios from 'axios';
window.axios = axios;
// ---
const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store = {store} ><App/></Provider>, // The provider tag here is a react component that knows how to read changes from our redux store
    document.querySelector('#root'));

console.log('THE STRIPE KEY IS ', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment: ', process.env.NODE_ENV);