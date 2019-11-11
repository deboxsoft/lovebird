/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// const listBundle = ['@babel/runtime', 'react-native', 'invariant'];
// const path = require('path');
// const fs = require('fs');
// const packageJson = require('./package.json');
// const registryPath = path.resolve(__dirname, '../node_modules/.pnpm');
// const dependencies = Object.assign(packageJson.devDependencies, packageJson.dependencies);
// const registry = 'registry.npmjs.org';
//
// function getPackagePath(name, libs) {
//   return path.resolve(registryPath, `./${registry}/${name}/${libs[name]}/node_modules/${name}`);
// }
//
// const resolver = {};
// listBundle.forEach(name => {
//   resolver[name] = getPackagePath(name, dependencies);
// });

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  }
};
