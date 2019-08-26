import React, { ReactNode } from 'react';

import SiteNav from './SiteNav';
import { Container } from 'react-bootstrap';

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

export const Layout = ({
  children,
  title = 'Digital Journal'
}: LayoutProps): JSX.Element => (
  <React.Fragment>
    <SiteNav />

    <Container fluid as="main">
      {children}
    </Container>

    <footer>&copy; 2019; Joseph Morse; MIT</footer>
  </React.Fragment>
);
