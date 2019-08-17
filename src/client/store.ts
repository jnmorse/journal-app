import {
  createStore,
  applyMiddleware,
  compose,
  Store,
  Middleware
} from 'redux';
import thunk, { ThunkMiddleware, ThunkDispatch } from 'redux-thunk';

import { Reducers, StoreState } from './reducers';
import { UserActions } from './actions';

export function getStore(
  initialState: StoreState
): Store<StoreState, UserActions> {
  return createStore(
    Reducers,
    initialState,
    applyMiddleware<ThunkMiddleware<StoreState, UserActions, {}>>(thunk)
  );
}
