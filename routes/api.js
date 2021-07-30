// The following API routes should be created:
// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
// * `POST /api/notes`

// * `DELETE /api/notes/:id` should receive a query parameter containing the id of a note to delete. 
// In order to delete a note, you'll need to read all notes from the `db.json` file, 
// remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

const router = require('express').Router()
const db = require('../db/db.json');
const path = require('path'); 
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.get('/api/notes', (req, res) => {
   
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
   console.log(data);
        res.json(JSON.parse(data)); 
    })
})


router.post('/api/notes', (req,res)=>{
   console.log('passed in note ', req.body); 
//    const filePath = path.join(__dirname, "../db/db.json";

    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {

        if (err) {
            console.error(err);
        } 
        else {
        const notes = JSON.parse(data);
        // console.log('read notes dbfile ', notes); 

        const newNote = {
            "id":uuidv4(),
            "title":req.body.title,
            "text":req.body.text
        }
        // console.log('new note: ' + newNote);
        // notes.push(req.body);  replaced with newNote object below
        notes.push(newNote);
      
        const notesJSON = JSON.stringify(notes, null, 4); 
        console.log('new note list ', notesJSON); 
        
            fs.writeFile(path.join(__dirname, "../db/db.json"), notesJSON, (err) => {
                err ? console.error(err) : console.info(`\nData written to file`)
                res.json(notes);
            });
      
        }
    })
});


router.delete('/api/notes/:id', (req,res)=>{
    const noteID = req.params.id;
    console.log('noteID is ' + noteID);

    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {

        if (err) {
            console.error(err);
        } 
        else {
        const notes = JSON.parse(data);

        for(let i = 0; i < notes.length; i++) {
            if(noteID === notes[i].id) {
                notes.splice(i,1);
            }
            else {
            // console.log('not a match');
            }
        }

        const notesJSON = JSON.stringify(notes, null, 4); 
        fs.writeFile(path.join(__dirname, "../db/db.json"), notesJSON, (err) => {
            err ? console.error(err) : console.info(`\nData written to file`)
        });

        res.json(db);
        }
    });

});

module.exports = router;
