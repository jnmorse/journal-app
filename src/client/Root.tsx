import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { App } from './components/App';
import { getStore } from './store';
import { StoreState } from './reducers';

let initState: StoreState = {
  user: { isAuthorized: false, token: '' }
};

declare global {
  interface Window {
    initState: StoreState;
  }
}

if (typeof window !== 'undefined') {
  initState = window.initState;
}

export const Root = () => (
  <Provider store={getStore(initState)}>
    <Router>
      <App />
    </Router>
  </Provider>
);
