'use strict';

import 'babel-polyfill';
import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';
import ChatApp      from './containers/ChatApp'

const store = configureStore()

React.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('react-view')
);
