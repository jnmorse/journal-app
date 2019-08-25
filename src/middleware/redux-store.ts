import { createStore, applyMiddleware, Reducer, Store, Action } from 'redux';
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { Response, NextFunction, Request } from 'express';
import axios, { AxiosInstance } from 'axios';
import { StoreState } from '../client/reducers';
import {
  Actions,
  getJournalEntries,
  GetJournalEntriesAction
} from '../client/actions';
import { UserDocument } from '../schemas/user-schema';

export function reduxStoreMiddleware(reducers: Reducer) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const api: AxiosInstance = axios.create({
      baseURL: 'http://localhost:3010/api'
    });

    const user = req.user as UserDocument;

    const store: Store<StoreState, Actions> = createStore<
      StoreState,
      Actions,
      any,
      any
    >(
      reducers,
      {
        user: user
          ? {
              _id: user.id,
              username: user.username,
              email: user.email,
              created: user.created.toUTCString(),
              updated: user.updated.toUTCString()
            }
          : false
      },
      applyMiddleware(thunk.withExtraArgument(api))
    );

    await store.dispatch<any>(getJournalEntries());

    res.locals.store = store;

    next();
  };
}
