import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import config from 'config';
import getLogger from './logger';
import staticKoa from 'koa-static';
import { createApolloServer } from './graphql';

if (config.get('debug')) {
  // eslint-disable-next-line global-require
  require('@google-cloud/debug-agent').start();
}
createApolloServer.then(apolloServer => {
  const app = new Koa();
  const router = new Router();
  const bodyParserMiddleware = bodyParser();

  // middleware
  app.use(bodyParserMiddleware);

  // logger
  const logger = getLogger();
  app.context.logger = logger;
  // loggerMiddleware(app)
  apolloServer.applyMiddleware({ app, path: '/server' });

  // static images
  router.get('/resources/**', staticKoa(config.get('app.home')));
  // router
  router.get('/', async (ctx, next) => {
    await next();
  });

  // router
  app.use(router.routes());

  const port = config.get('app.port') || 3000;
  const url = config.get('app.url') || 'localhost';
  logger.info('current environment: %s', process.env.NODE_ENV);
  logger.info('server started at port: %d', port);
  app.listen({ port }, () => {
    logger.info(`🚀 Graphql Server ready at http://${url}:${port}${apolloServer.graphqlPath}`);
  });
});
