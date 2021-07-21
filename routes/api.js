
// The following API routes should be created:

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// * `POST /api/notes`
const app = require('express').Router()
const db = require('../db/db.json');
// const fs = require('fs');

// app.get('/api/notes', (req, res) => 
app.get('/api/notes', (req, res) => {
    // console.log("path:",path.join(__dirname,"../public/index.html"));
    res.json(db);
})

app.post('/api/notes', (req,res)=>{
   console.log(req.body);
    db.push(req.body);
    res.json(db);
})
module.exports = app;
// app.get('/', (req, res) => 