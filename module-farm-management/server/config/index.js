const config = require('@deboxsoft/config');

config.set({
  db: {
    name: 'test',
    type: 'sqlite',
    synchronize: true,
    database: '../tmp/sqlite.db'
  }
});
