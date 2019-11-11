import React from 'react';
import { Layout, Text } from './components';
import { StyleSheet } from 'react-native';

export const DashboardPage = () => {
  return (
    <Layout style={styles.layout}>
      <Text>Dashboard</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    padding: 10
  }
});
