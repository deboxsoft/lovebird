import React, { Suspense } from 'react';
import { NotFoundError } from 'navi';
import { ThemeProvider, createGlobalStyle } from 'styled-components/macro';
import { Link, View, NotFoundBoundary, useLoadingRoute } from '@deboxsoft/component-webapp-react';
import { theme, ResetStyled } from './theme';
import { Layout } from './components';

export const App = () => {
  const loadingRoute = useLoadingRoute();
  return (
    <ThemeProvider theme={theme}>
      <>
        <ResetStyled />
        <Layout loading={!!loadingRoute}>
          <NotFoundBoundary render={renderNotFound}>
            <Suspense fallback={<div>loading</div>}>
              <View />
            </Suspense>
          </NotFoundBoundary>
        </Layout>
      </>
    </ThemeProvider>
  );
};

const renderNotFound = ({ pathname, status, message }: NotFoundError) => (
  <div className="App-error">
    <h1>404 - Not Found</h1>
  </div>
);
