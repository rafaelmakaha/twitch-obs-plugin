const router = require('express').Router()
const fs = require('fs')
const path = require('path')

router.get('/settings', (req, res) => {
  const settings = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings', 'settings.json')))
  res.json(settings)
})

router.put('/settings', (req, res) => {
  fs.writeFileSync(path.join(__dirname, '..', 'settings', 'settings.json'),
    JSON.stringify(req.body))

  req.bot.configureRewards()
  res.json(req.body)
})

module.exports = router
