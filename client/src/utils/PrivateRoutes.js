/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoutes({ component: Component, ...rest }) {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props) =>
        localStorage.getItem('token') ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Component {...props} />
        ) : (
          <>
            {console.log('REDIRECT')}
            <Redirect to="/login" />
          </>
        )
      }
    />
  );
}
