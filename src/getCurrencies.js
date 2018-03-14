const logger = require('./logger')
const { fetchLatest } = require('./openExchangeApi')

const cacheDuration =
  process.env.NODE_ENV === 'production'
    ? 24 * 60 * 60 * 1000 // 1 day
    : 10 * 1000 // 10 seconds

const cache = {}

async function getCurrencies() {
  let needRequest
  if (!cache.rates) {
    logger.info('No cache content')
    needRequest = true
  } else if (new Date().valueOf() > cache.info.expiresAt.valueOf()) {
    logger.info('Cache expired')
    needRequest = true
  } else {
    logger.info('Cache content for rates already exists')
    needRequest = false
  }

  if (needRequest) {
    const { rates } = await fetchLatest()
    cache.rates = rates
    cache.info = {
      nbRequests: 0,
      lastRequestAt: new Date(),
      expiresAt: new Date(Date.now() + cacheDuration)
    }
  }

  cache.info.nbRequests++
  logger.info(`Cache info: ${JSON.stringify(cache.info)}`)

  return cache.rates
}

module.exports = getCurrencies
