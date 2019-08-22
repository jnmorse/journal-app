import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { Reducers, StoreState } from './reducers';
import { Actions } from './actions';
import axios, { AxiosInstance } from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export function getStore(initialState: StoreState): Store<StoreState, Actions> {
  return createStore(
    Reducers,
    initialState,
    composeWithDevTools(
      applyMiddleware<ThunkMiddleware<StoreState, Actions, AxiosInstance>>(
        thunk.withExtraArgument(api)
      )
    )
  );
}
