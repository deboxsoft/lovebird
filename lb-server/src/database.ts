import { createConnection, ConnectionOptions } from '@deboxsoft/typeorm';
import config from 'config';
import getLogger from './logger';
import { Bird, BirdRecord } from '@deboxsoft/lb-module-farm-management-server/bird';
import { Breeding, BreedingRecord } from '@deboxsoft/lb-module-farm-management-server/breeding';
import { Mate, MateRecord } from '@deboxsoft/lb-module-farm-management-server/mate';
import { Farm } from '@deboxsoft/lb-module-farm-management-server/farm';
import { Species } from '@deboxsoft/lb-module-farm-management-server/species';

const entities = [Species, Bird, BirdRecord, Breeding, BreedingRecord, Farm, Mate, MateRecord];
const logger = getLogger();
const dbConfig = config.get<ConnectionOptions>('db');
export const getConnection = async () => {
  const connectionOptions = Object.create(config.util.extendDeep(dbConfig, {
    entities,
  }));
  try {
    const connection = await createConnection(connectionOptions);
    return connection;
  } catch (e) {
    logger.error('failed connection to database because : %s', e.message);
    throw new Error(e);
  }
};
