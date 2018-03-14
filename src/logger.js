const {
  createLogger,
  format: { combine, colorize, timestamp, printf },
  transports: { Console }
} = require('winston')

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    colorize(),
    timestamp(),
    printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new Console()]
})

module.exports = logger
