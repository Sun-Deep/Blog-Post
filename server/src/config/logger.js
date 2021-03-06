import { createLogger, transports, format, info} from 'winston'

const env = process.env.NODE_ENV

// creating logger
const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.level} ${info.timestamp}: ${info.message}`),
    ),
    transports: [
      new transports.Console({
          level: 'debug',
          format: format.combine(
            format.colorize(),
            format.printf(info => `${info.level} ${info.timestamp}: ${info.message}`)

          )
      }),
      new transports.File({
        maxsize: 5120000,
        maxFiles: 5,
        filename: 'logs/logs-api.log'
      })
    ]
  });

export default logger