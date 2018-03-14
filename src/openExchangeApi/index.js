const fetch = require('isomorphic-fetch')
const logger = require('../logger')

async function fetchLatestFromMock() {
  return require('./mockResult').latest
}

async function fetchLatest() {
  if (process.env.NODE_ENV !== 'production') {
    logger.info('Fetching latest from mock')
    return fetchLatestFromMock()
  }
  logger.info('Fetching latest from API')
  const appId = process.env.OPENEXCHANGE_APP_ID
  const url = `https://openexchangerates.org/api/latest.json?app_id=${appId}`
  const res = await fetch(url)
  const json = res.json()
  return json
}

module.exports = { fetchLatest }
