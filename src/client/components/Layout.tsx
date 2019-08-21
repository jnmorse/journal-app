import React, { ReactNode } from 'react';

import SiteNav from './SiteNav';

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

export const Layout = ({
  children,
  title = 'Digital Journal'
}: LayoutProps): JSX.Element => (
  <React.Fragment>
    <header className="sr-only">
      <h1>{title}</h1>
    </header>
    <SiteNav />

    <main style={{ marginTop: '0.5em' }}>{children}</main>

    <footer>&copy; 2019; Joseph Morse; MIT</footer>
  </React.Fragment>
);
