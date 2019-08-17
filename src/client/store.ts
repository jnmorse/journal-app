import { createStore, applyMiddleware, Store } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { Reducers, StoreState } from './reducers';
import { UserActions } from './actions';
import axios, { AxiosInstance } from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export function getStore(
  initialState: StoreState
): Store<StoreState, UserActions> {
  return createStore(
    Reducers,
    initialState,
    applyMiddleware<ThunkMiddleware<StoreState, UserActions, AxiosInstance>>(
      thunk.withExtraArgument(api)
    )
  );
}
