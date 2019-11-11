import React, { Suspense } from 'react';
import { NotFoundError } from 'navi';
import { ThemeProvider } from 'styled-components/macro';
import { ApolloProvider } from '@apollo/react-hooks';
import { View, NotFoundBoundary, useLoadingRoute } from 'react-navi';
import { theme, ResetStyled } from './theme';
import { Layout } from './components';
import { apolloClient } from './apolloClient';

export const App = () => {
  const loadingRoute = useLoadingRoute();
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <>
          <ResetStyled />
          <Layout loading={!!loadingRoute}>
            <NotFoundBoundary render={RenderNotFound}>
              <Suspense fallback={<div>loading</div>}>
                <View />
              </Suspense>
            </NotFoundBoundary>
          </Layout>
        </>
      </ThemeProvider>
    </ApolloProvider>
  );
};

const RenderNotFound = ({ pathname, status, message }: NotFoundError) => (
  <div className="App-error">
    <h1>404 - Not Found</h1>
  </div>
);
