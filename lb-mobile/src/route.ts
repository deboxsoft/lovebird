/* eslint-disable global-require */
import { Navigation } from 'react-native-navigation';
import { registerAuthPage } from './authentication';

export const registerComponents = () => {
  registerAuthPage();
  Navigation.registerComponent('Dashboard', () => require('./Dashboard').DashboardPage);
};

registerComponents();

export const appRoute = () =>
  Navigation.setRoot({
    root: {
      component: {
        id: 'App',
              name: 'Dashboard',
              options: {
                topBar: {
                  searchBar: true
                }
              }
            }
    }
  });
