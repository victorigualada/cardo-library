import * as React from 'react';
import {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import RequireAuth from '../components/Auth/require-auth';
import {Styles} from '../styles/styles';
import routes from './config';

interface RouterProps {
  hideLoader: () => void;
}

const Router = ({ hideLoader }: RouterProps) => {

  return (
    <Suspense fallback={null}>
      <Styles />
      <Routes>
        {routes.map((routeItem) => {
          let MenuElement = React
            .createElement(
              lazy(() => import(`../pages/${routeItem.component}`)),
              { hideLoader }
            );

          // If the component requires auth, redirect to login form
          if (routeItem.auth) {
            MenuElement = <RequireAuth>{MenuElement}</RequireAuth>
          }

          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              element={MenuElement} />
            );
        })}
      </Routes>
    </Suspense>
  );
};

export default Router;
