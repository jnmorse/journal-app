import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { App } from './components/App';
import { getStore } from './store';
import { StoreState } from './reducers';
import { ActionTypes } from './actions';

let initState: StoreState = {
  user: { id: '', email: '', created: '', updated: '' }
};

declare global {
  interface Window {
    initState: StoreState;
  }
}

if (typeof window !== 'undefined') {
  initState = window.initState;
}
const store = getStore(initState);

export const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};
