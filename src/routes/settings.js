const router = require('express').Router();
const fs = require('fs');

// define the home page route
router.get('/settings', (req, res) => {
    const settings = require('../settings/settings.json');
    res.json(settings)
});
// define the about route
router.put('/settings', (req, res) => {
    res.send('About birds');
});

module.exports = router;