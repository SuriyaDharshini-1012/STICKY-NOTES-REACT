import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Ensure this line is included
import store from '../src/redux/Store'; // Adjust the path as necessary
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
