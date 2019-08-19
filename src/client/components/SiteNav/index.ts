import { connect } from 'react-redux';
import { SiteNav } from './SiteNav';
import { User } from '../../actions';
import { StoreState } from '../../reducers';
import { RouteProps, withRouter, RouteComponentProps } from 'react-router-dom';

export interface StateProps {
  user: User;
}

function mapStateToProps({ user }: StoreState): StateProps {
  return { user };
}

export default connect<StateProps, {}, RouteProps, StoreState>(mapStateToProps)(
  withRouter(SiteNav)
);
