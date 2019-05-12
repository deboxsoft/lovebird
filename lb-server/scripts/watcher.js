/* eslint-disable no-console,no-shadow,camelcase */
const watchman = require('fb-watchman');

const client = new watchman.Client();

client.capabilityCheck({ optional: [], required: ['relative_root'] }, error => {
  if (error) {
    // error will be an Error object if the watchman service is not
    // installed, or if any of the names listed in the `required`
    // array are not supported by the server
    console.error(error);
  }
  client.command(['watch-project', process.cwd()], (error, { watch, relative_path }) => {
    const watchConfig = {
      expression: [
        'anyof',
        ['match', 'src/**/*.[tj]s', 'wholename'],
        ['match', 'scripts/**/*.[tj]s', 'wholename'],
        ['match', 'config/**/*.[tj]s', 'wholename']
      ],
      relative_root: relative_path
    };
    client.command(['subscribe', watch, 'start-server-apollo', watchConfig], (error, resp) => {
      console.log(`subscribe: ${resp.subscribe}`);
    });
  });
});

client.on('subscription', resp => {
  console.log(require.cache);
});
