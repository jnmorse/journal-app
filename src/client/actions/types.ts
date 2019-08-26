import { Action } from 'redux';
import { User } from './interfaces';
import { JournalEntry } from './journal-actions';

export interface SigninSuccessAction {
  type: ActionTypes.Signin_Success;
}

export interface SigninFailAction {
  type: ActionTypes.Signin_Fail;
  payload: string;
}

export interface CurrentUserAction {
  type: ActionTypes.Current_User;
  payload: User;
}

export interface SignupSuccessAction {
  type: ActionTypes.Signup_Success;
  payload: User;
}

export interface SignupFailAction {
  type: ActionTypes.Signup_Fail;
  payload: any;
}

export interface UserError {
  type: ActionTypes.User_Error;
  payload: any;
}

export interface GetJournalEntriesAction {
  type: ActionTypes.GetJournalEntries;
  payload: JournalEntry[];
}

export interface NewJournalEntryAction {
  type: ActionTypes.NewJournalEntrySuccess | ActionTypes.NewJournalEntryFail;
  payload?: JournalEntry;
}

export interface DeleteJournalEntrySuccessAction {
  type: ActionTypes.DeleteJournalEntrySuccess;
  payload: string;
}

export interface DeleteJournalEntryFailAction {
  type: ActionTypes.DeleteJournalEntryFail;
  payload: string;
}

export interface EditJournalEntrySuccessAction {
  type: ActionTypes.EditJournalEntrySuccess;
  payload: JournalEntry;
}

export interface EditJournalEntryFailAction {
  type: ActionTypes.EditJournalEntryFail;
  payload: string;
}

export enum ActionTypes {
  User_Error = 'USER_ERROR',
  Signin_Success = 'SIGNIN_SUCCESS',
  Signin_Fail = 'SIGNIN_FAIL',
  Current_User = 'CURRENT_USER',
  Signup_Success = 'SIGNUP_SUCCESS',
  Signup_Fail = 'SIGNUP_FAIL',
  GetJournalEntries = 'GET_JOURNAL_ENTRIES',
  NewJournalEntrySuccess = 'NEW_JOURNAL_ENTRY_SUCCESS',
  NewJournalEntryFail = 'NEW_JOURNAL_ENTRY_FAIL',
  DeleteJournalEntrySuccess = 'DELETE_JOURNAL_ENTRY_SUCCESS',
  DeleteJournalEntryFail = 'DELETE_JOURNAL_ENTRY_FAIL',
  EditJournalEntrySuccess = 'EDIT_JOURNAL_ENTRY_SUCCESS',
  EditJournalEntryFail = 'EDIT_JOURNAL_ENTRY_FAIL'
}

export type Actions =
  | SigninSuccessAction
  | SigninFailAction
  | CurrentUserAction
  | SignupSuccessAction
  | SignupFailAction
  | GetJournalEntriesAction
  | NewJournalEntryAction
  | DeleteJournalEntrySuccessAction
  | DeleteJournalEntryFailAction
  | EditJournalEntrySuccessAction
  | EditJournalEntryFailAction;
