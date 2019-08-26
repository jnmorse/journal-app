import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import { StoreState } from '../reducers';
import {
  GetJournalEntriesAction,
  ActionTypes,
  NewJournalEntryAction,
  DeleteJournalEntrySuccessAction,
  DeleteJournalEntryFailAction
} from './types';
import { User } from './interfaces';
import { string } from 'prop-types';

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
}

export function getJournalEntries(): ThunkAction<
  Promise<void>,
  StoreState,
  AxiosInstance,
  GetJournalEntriesAction
> {
  return async (dispatch, getState, api) => {
    const response = await api.get<JournalEntry[]>('/journals');

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

function deleteJournalEntrySuccess(
  id: string
): DeleteJournalEntrySuccessAction {
  return {
    type: ActionTypes.DeleteJournalEntrySuccess,
    payload: id
  };
}

function deleteJournalEntryFail(id: string): DeleteJournalEntryFailAction {
  return {
    type: ActionTypes.DeleteJournalEntryFail,
    payload: id
  };
}

export type DeleteResponse =
  | DeleteJournalEntrySuccessAction
  | DeleteJournalEntryFailAction;

export function deleteJournalEntry(
  id: string
): ThunkAction<
  Promise<DeleteResponse>,
  StoreState,
  AxiosInstance,
  DeleteResponse
> {
  return async (dispatch, getState, api) => {
    const response = await api.delete<void>(`/journals/${id}`);

    if (response.status === 200) {
      return dispatch(deleteJournalEntrySuccess(id));
    }

    return dispatch(deleteJournalEntryFail(id));
  };
}
