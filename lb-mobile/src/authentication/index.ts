/* eslint-disable global-require */
import { Navigation } from 'react-native-navigation';

export const registerAuthPage = () => {
  Navigation.registerComponent('Login', () => require('./LoginPage').LoginPage);
};

export const authRoute = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'authBottomMenu',
        children: [
          {
            component: {
              name: 'Login',
              options: {
                bottomTab: {
                  text: 'Login',
                  icon: 0
                }
              }
            }
          },
          {
            component: {
              name: 'register',
              options: {
                bottomTab: {
                  text: 'Register',
                  icon: 0
                }
              }
            }
          }
        ]
      }
    }
  });
