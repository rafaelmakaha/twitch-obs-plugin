const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// define the home page route
router.get('/settings', (req, res) => {
    const settings = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings', 'settings.json')));
    res.json(settings)
});
// define the about route
router.put('/settings', (req, res) => {
    fs.writeFileSync(path.join(__dirname, '..', 'settings', 'settings.json'), 
                        JSON.stringify(req.body))

    req.bot.configureRewards();
    res.json(req.body);
});

module.exports = router;