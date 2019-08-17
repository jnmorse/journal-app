import React from 'react';
import { Route } from 'react-router-dom';

export interface StatusCodeProps {
  code: number;
  children: React.ReactNode;
}

export const StatusCode = ({
  code,
  children
}: StatusCodeProps): JSX.Element => {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.statusCode = code;
        }

        return children;
      }}
    />
  );
};
