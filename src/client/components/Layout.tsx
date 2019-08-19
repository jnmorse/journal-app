import React, { ReactNode } from 'react';

import SiteNav from './SiteNav';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): JSX.Element => (
  <React.Fragment>
    <SiteNav />

    <main style={{ marginTop: '0.5em' }}>{children}</main>

    <footer>&copy; 2019; Joseph Morse; MIT</footer>
  </React.Fragment>
);
