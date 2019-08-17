import React from 'react';
import Helmet from 'react-helmet';

import image from '../../images/quill-svgrepo-com.svg';
import { StatusCode } from '../../components/StatusCode';

import { container } from '../../styles/container.css';
import { backgroundColor } from './not-found.css';

export interface NotFoundPropTypes {
  status: number;
}

export const NotFound = ({ status }: NotFoundPropTypes): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>

      <StatusCode code={404}>
        <div className={[container, backgroundColor].join(' ')}>
          <header>
            <h1>404 Not Found</h1>
          </header>

          <p>Sorry the page you where looking for was not found</p>
        </div>
      </StatusCode>
    </>
  );
};
