import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { StoreState } from '../reducers';
import { AxiosInstance } from 'axios';
import {
  GetJournalEntriesAction,
  ActionTypes,
  Actions,
  NewJournalEntryAction
} from './types';
import { Action } from 'redux';
import { User } from './interfaces';

export interface JournalEntry {
  _id: string;
  title: string;
  body: string;
  image: string;
  private: boolean;
  category: string[];
  tags: string[];
  created: string;
  updated: string;
  user: User;
}

export interface NewJournalEntry {
  title: string;
  body: string;
  image: string;
  private: boolean;
  category: string[];
  tags: string[];
}

export function getJournalEntries(
  limit: number = 5,
  offset: number = 0
): ThunkAction<
  Promise<void>,
  StoreState,
  AxiosInstance,
  GetJournalEntriesAction
> {
  return async (dispatch, getState, api) => {
    const response = await api.get<JournalEntry[]>('/journals', {
      params: {
        limit,
        offset
      }
    });

    dispatch({
      type: ActionTypes.GetJournalEntries,
      payload: response.data
    });
  };
}

export function newJournalEntry(
  data: NewJournalEntry
): ThunkAction<
  Promise<NewJournalEntryAction>,
  StoreState,
  AxiosInstance,
  NewJournalEntryAction
> {
  return async (dispatch, getState, api) => {
    const response = await api.post<JournalEntry>('/journals', data);

    if (response.status === 201) {
      return dispatch(createSuccess(response.data));
    }

    return dispatch(newJournalEntryFail());
  };
}

function createSuccess(data: JournalEntry): NewJournalEntryAction {
  return {
    type: ActionTypes.NewJournalEntrySuccess,
    payload: data
  };
}

function newJournalEntryFail(): NewJournalEntryAction {
  return {
    type: ActionTypes.NewJournalEntryFail
  };
}
