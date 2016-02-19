'use strict';

import 'babel-polyfill';

import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';

let store = createStore(ChatApp);

React.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('react-view')
);
