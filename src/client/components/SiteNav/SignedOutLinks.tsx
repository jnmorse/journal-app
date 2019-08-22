import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';

interface SignOutLinksProps {
  path: string;
}

export const SignedOutLinks = ({ path }: SignOutLinksProps): JSX.Element => (
  <>
    <Nav.Link as={Link} to="/signin" active={'/signin' === path}>
      Signin
    </Nav.Link>

    <Nav.Link as={Link} to="/signup" active={'/signup' === path}>
      Signup
    </Nav.Link>
  </>
);
