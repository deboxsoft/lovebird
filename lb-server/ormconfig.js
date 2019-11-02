const config = require('config');
const accountsEntities = require('@deboxsoft/accounts-typeorm').entities;
const farmManagement = require('@deboxsoft/lb-module-farm-management-server');

const entities = [
  ...accountsEntities,
  farmManagement.Species,
  farmManagement.Farm,
  farmManagement.Bird,
  farmManagement.BirdRecord,
  farmManagement.Mate,
  farmManagement.MateRecord
];

const dbConfig = config.get('db');
module.exports = Object.assign(JSON.parse(JSON.stringify(dbConfig)), { entities });
