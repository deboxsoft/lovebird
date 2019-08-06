import { createLogger, format as formatLogger, transports as transportLogger } from 'winston';
import config from 'config';

const loggerConfig = config.util.toObject(config.get('logger'));
loggerConfig.format =
  loggerConfig.format || formatLogger.combine(formatLogger.splat(), formatLogger.simple());
loggerConfig.transports = loggerConfig.transports || [new transportLogger.Console()];
const logger = createLogger(loggerConfig);

export default () => logger;
