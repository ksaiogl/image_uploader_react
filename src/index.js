import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App/index.js';
import uploadReducer from './reducers';
import './index.css';

let store = createStore(uploadReducer)

render(
   <Provider store = {store}>
      <App />
   </Provider>, document.getElementById('root'));