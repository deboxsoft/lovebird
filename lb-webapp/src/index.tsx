/* eslint-disable global-require */
import React from 'react';
import { createBrowserNavigation } from 'navi';
import { Router } from 'react-navi';
import { render, hydrate } from 'react-dom';
import { ServerStyleSheet } from 'styled-components/macro';
import { App } from './App';
import { routes } from './routes';
import * as serviceWorker from './serviceWorker';
import register from './register';
register({
  routes,
  exports: {
    App,
    ServerStyleSheet
  },
  async main() {
    const navigation = createBrowserNavigation({ routes });
    await navigation.getRoute();

    const hasStaticContent = process.env.NODE_ENV === 'production';
    const renderer = hasStaticContent ? hydrate : render;
    renderer(
      <Router navigation={navigation}>
        <App />
      </Router>,
      document.getElementById('debox-app')
    );
    serviceWorker.unregister();
  }
});
