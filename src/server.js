const logger = require('./logger')
const express = require('express')
const morgan = require('morgan')
const getCurrencies = require('./getCurrencies')

const app = express()

app.use(
  morgan('tiny', {
    stream: {
      write(message) {
        logger.info(message)
      }
    }
  })
)

app.get('/', async (req, res) => {
  try {
    res.json(await getCurrencies())
  } catch (err) {
    logger.error(err.stack || err.message || err)
    res.status(500).json({ error: true })
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  logger.info(`Server started on port ${port}`)
})
