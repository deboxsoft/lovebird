import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { BootLoader, Layout } from './components';
import { authRoute } from './authentication';
import { appRoute } from './route';

const App: () => React.ReactElement = () => {
  useEffect(() => {
    async function loadRoute() {
      const timeout = (time: number) => new Promise((cb) => setTimeout(cb, time));
      await timeout(2000);
      appRoute();
    }
    loadRoute();
  });
  return (
    <Layout style={styles.layout}>
      <BootLoader />
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
