/**
 * @format
 */

import {Navigation} from '@deboxsoft/react-native'
import App from './src/App';

Navigation.registerComponent('com.deboxsoft.lovebird.home', () => App);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'com.deboxsoft.lovebird.home'
      }
    }
  })
})
