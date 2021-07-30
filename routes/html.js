// The following HTML routes should be created:
// * `GET /notes` - returns the `notes.html` file.
// * `GET *` - returns the `index.html` file.

const router = require('express').Router()
const path = require('path');

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,"../public/notes.html"))
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,"../public/index.html"))
});

module.exports = router;