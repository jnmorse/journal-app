import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';

import JournalForm from './JournalForm';
import { StoreState } from '../../reducers';

import {
  NewJournalEntryAction,
  newJournalEntry,
  JournalEntry,
  NewJournalEntry
} from '../../actions';
import { RouteComponentProps } from 'react-router';

export interface JournalFormDispatchProps {
  newEntry: (data: NewJournalEntry) => Promise<NewJournalEntryAction>;
}

export interface JournalFormStateProps {
  entry?: JournalEntry;
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, AxiosInstance, NewJournalEntryAction>
): JournalFormDispatchProps {
  return {
    newEntry: (data: NewJournalEntry): Promise<NewJournalEntryAction> =>
      dispatch(newJournalEntry(data))
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
