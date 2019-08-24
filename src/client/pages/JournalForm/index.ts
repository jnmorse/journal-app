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

export interface JournalFormDispatchProps {
  newEntry: (data: NewJournalEntry) => Promise<NewJournalEntryAction>;
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<StoreState, AxiosInstance, NewJournalEntryAction>
): JournalFormDispatchProps {
  return {
    newEntry: (data: NewJournalEntry): Promise<NewJournalEntryAction> =>
      dispatch(newJournalEntry(data))
  };
}

export default connect<{}, JournalFormDispatchProps, {}, StoreState>(
  null,
  mapDispatchToProps
)(JournalForm);
