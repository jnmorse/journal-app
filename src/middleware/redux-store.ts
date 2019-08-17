import { createStore, applyMiddleware, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import axios, { AxiosInstance } from 'axios';
import { StoreState } from '../client/reducers';
import { UserActions } from '../client/actions';

export function reduxStoreMiddleware(reducers: Reducer): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const api: AxiosInstance = axios.create({
      baseURL: '/api'
    });

    const store: Store<StoreState, UserActions> = createStore(
      reducers,
      {},
      applyMiddleware(thunk)
    );

    res.locals.store = store;

    next();
  };
}
