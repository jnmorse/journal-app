import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, RouteComponentProps, matchPath } from 'react-router-dom';

import { StateProps } from './index';
import image from '../../images/quill-svgrepo-com.svg';

type SiteNavProps = StateProps & RouteComponentProps<any>;

export class SiteNav extends Component<SiteNavProps> {
  public render() {
    const { user } = this.props;
    return (
      <Navbar bg="dark" variant="dark" expand="sm">
        <Navbar.Brand as={Link} to="/" href="/">
          <img
            src={image}
            alt="Quill"
            height="30"
            style={{ marginRight: 10 }}
          />
          {'Digital Journal'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user.id ? <Nav.Link href="/api/signout">Signout</Nav.Link> : null}
            <Nav.Link
              as={Link}
              href="/signin"
              to="/signin"
              active={'/signin' === this.props.match.path}
            >
              Signin
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/signup"
              to="/signup"
              active={'/signup' === this.props.match.path}
            >
              Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
