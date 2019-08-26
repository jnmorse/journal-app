import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import JournalForm from './JournalForm';
import { StoreState } from '../../reducers';

import {
  NewJournalEntryAction,
  newJournalEntry,
  JournalEntry,
  NewJournalEntry,
  editJournalEntry,
  EditJournalEntrySuccessAction,
  EditJournalEntryFailAction,
  Actions
} from '../../actions';
import { RouteComponentProps } from 'react-router';

export interface JournalFormDispatchProps {
  newEntry: (data: NewJournalEntry) => Promise<NewJournalEntryAction>;
  editEntry: (
    data: JournalEntry
  ) => Promise<EditJournalEntryFailAction | EditJournalEntrySuccessAction>;
}

export interface JournalFormStateProps {
  entry?: JournalEntry;
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, AxiosInstance, Actions>
): JournalFormDispatchProps {
  return {
    newEntry(data: NewJournalEntry): Promise<NewJournalEntryAction> {
      return dispatch(newJournalEntry(data));
    },

    editEntry(
      data: JournalEntry
    ): Promise<EditJournalEntrySuccessAction | EditJournalEntryFailAction> {
      return dispatch(editJournalEntry(data));
    }
  };
}

function mapStateToProps(
  { journals }: StoreState,
  { match: { params } }: RouteComponentProps<{ id: string }>
): JournalFormStateProps {
  if (params.id) {
    const entry = journals.find(e => e._id === params.id);
    return {
      entry
    };
  }

  return {
    entry: undefined
  };
}

export default connect<
  JournalFormStateProps,
  JournalFormDispatchProps,
  RouteComponentProps<{ id: string }>,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(JournalForm);
