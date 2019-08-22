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
    <SiteNav />

    <main>{children}</main>

    <footer>&copy; 2019; Joseph Morse; MIT</footer>
  </React.Fragment>
);
