import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface SignedInLinksProps {
  path: string;
}

export const SignedInLinks = ({ path }: SignedInLinksProps): JSX.Element => {
  return (
    <>
      <Nav.Link as={Link} to="/journal/new" active={'/journal/new' === path}>
        New Post
      </Nav.Link>

      <Nav.Link href="/api/signout">Signout</Nav.Link>
    </>
  );
};
