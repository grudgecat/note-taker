// The following HTML routes should be created:

// * `GET /notes` should return the `notes.html` file.

// * `GET *` should return the `index.html` file.

const path = require('path');
const app = require('express').Router()


 

app.get('/', (req, res) => {
    console.log("path:",path.join(__dirname,"../public/index.html"));
    res.sendFile(path.join(__dirname,"../public/index.html"))
})


app.get('/notes', (req, res) => {
    console.log("path:",path.join(__dirname,"../public/notes.html"));
    res.sendFile(path.join(__dirname,"../public/notes.html"))
})





module.exports = app;