import config from 'config';
import { createConnection, ConnectionOptions } from '@deboxsoft/typeorm';
import { Connection } from '@deboxsoft/typeorm/connection/Connection';
import { Bird } from '../entities';
import { Farm } from '../../farm';
import { Mate, MateRecord } from '../../mate';
import { Species } from '../../species';

let connection: Connection;

process.env.NODE_CONFIG = JSON.stringify({
  db: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'cre8devel',
    database: 'lb-db-test',
    entities: [Bird, Farm, Species, Mate, MateRecord]
  }
});

export const getConnection = () => connection;

export const start = async (): Promise<Connection> => {
  const dbConfig = config.get<ConnectionOptions>('db') || {};
  if (dbConfig) {
    return createConnection(dbConfig).then(conn => {
      connection = conn;
      // eslint-disable-next-line no-console
      console.log('database connected');
      return connection;
    });
  } else throw new Error('config db tidak ditemukan.');
};

export const stop = () => connection.close();
