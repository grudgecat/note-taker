// The following HTML routes should be created:
// * `GET /notes` should return the `notes.html` file.
// * `GET *` should return the `index.html` file.

const router = require('express').Router()
const path = require('path');

router.get('/notes', (req, res) => {
    // console.log("path:",path.join(__dirname,"../public/notes.html"));
    res.sendFile(path.join(__dirname,"../public/notes.html"))
});

router.get('*', (req, res) => {
    
    // console.log("path:",path.join(__dirname,"../public/index.html"));
    res.sendFile(path.join(__dirname,"../public/index.html"))
});

module.exports = router;