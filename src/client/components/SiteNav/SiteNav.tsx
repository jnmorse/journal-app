import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, RouteComponentProps, matchPath } from 'react-router-dom';

import { StateProps } from './index';
import image from '../../images/quill-svgrepo-com.svg';

type SiteNavProps = StateProps & RouteComponentProps<any>;

import { SignedOutLinks } from './SignedOutLinks';
import { SignedInLinks } from './SignedInLinks';

export class SiteNav extends Component<SiteNavProps> {
  public render() {
    const {
      user,
      match: { path }
    } = this.props;
    return (
      <Navbar bg="dark" variant="dark" expand="sm">
        <header className="sr-only">
          <h2>Site Navigation</h2>
        </header>
        <Navbar.Brand as={Link} to="/" href="/">
          <img
            src={image}
            alt="Quill"
            height="30"
            style={{ marginRight: 10 }}
          />
          Digital Journal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/posts">
              Posts
            </Nav.Link>
            {user.id ? (
              <SignedInLinks path={path} />
            ) : (
              <SignedOutLinks path={path} />
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
