import { createStore, applyMiddleware, Reducer, Store } from 'redux';
import thunk from 'redux-thunk';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import axios, { AxiosInstance } from 'axios';
import { StoreState } from '../client/reducers';
import { Actions } from '../client/actions';

export function reduxStoreMiddleware(reducers: Reducer): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const api: AxiosInstance = axios.create({
      baseURL: 'http://localhost:3010/api'
    });

    const user = req.user;

    const store: Store<StoreState, Actions> = createStore<
      StoreState,
      Actions,
      any,
      any
    >(
      reducers,
      user
        ? {
            user: {
              _id: user._id,
              email: user.email,
              username: user.username,
              created: user.created,
              updated: user.updated
            }
          }
        : {},
      applyMiddleware(thunk.withExtraArgument(api))
    );

    res.locals.store = store;

    next();
  };
}
