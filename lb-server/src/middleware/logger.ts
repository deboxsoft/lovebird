import { createLogger as _createLogger, format, transports, LoggerOptions, Logger } from 'winston';
import {logger as _logger} from 'debox-logger'
import Koa from 'koa'

type Payload = {
  logger?: Logger
}

export const createLogger = (options: LoggerOptions = {}) => {
  options.format = options.format || format.combine(format.splat(), format.simple())
  options.transports = options.transports || [new transports.Console()]
  return _createLogger(options)
}

export const createLoggerMiddleware = (app: Koa, loggerOptions: LoggerOptions = {}, payload: Payload = {}) => {
  payload.logger = payload.logger || createLogger(loggerOptions)
  app.use(_logger(payload))
  return payload.logger
}
