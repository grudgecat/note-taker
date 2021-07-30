// The following API routes should be created:
// * `GET /api/notes` - read the `db.json` file and return all saved notes as JSON.
// * `POST /api/notes`- add new note to 'db.json' 
// * `DELETE /api/notes/:id` - receive id of a note to delete and remove from `db.json`

const router = require('express').Router();
const db = require('../db/db.json');
const path = require('path'); 
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

//display all notes from db.json
router.get('/api/notes', (req, res) => { 
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        res.json(JSON.parse(data)); 
    })
});

//add a new note
router.post('/api/notes', (req,res)=>{
    //read in notes from db.json, parse data to json
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } 
        else {
            const notes = JSON.parse(data);
            //create note id, generate new note object
            const newNote = {
                "id":uuidv4(),
                "title":req.body.title,
                "text":req.body.text
            }
            //push new note to notes collection
            notes.push(newNote);
            //prepare/stringify notes into json
            const notesJSON = JSON.stringify(notes, null, 4); 
            //write notes json data back to db.json file
            fs.writeFile(path.join(__dirname, "../db/db.json"), notesJSON, (err) => {
                err ? console.error(err) : console.info(`\nData written to file`)
                //send updated notes array back as response
                res.json(notes);
            });
        }
    })
});

//delete a note from db.json, takes note id as route parameter
router.delete('/api/notes/:id', (req,res)=>{
    //get note id from parameters
    const noteID = req.params.id;
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } 
        else {
        //get & parse notes data into json array
        const notes = JSON.parse(data);
        //loop through array looking for note id
        for(let i = 0; i < notes.length; i++) {
            if(noteID === notes[i].id) {
                //if id is found, remove note from array
                notes.splice(i,1);
            }
        }
        //prep/stringify notes to json format to write to file
        const notesJSON = JSON.stringify(notes, null, 4); 
        fs.writeFile(path.join(__dirname, "../db/db.json"), notesJSON, (err) => {
            err ? console.error(err) : console.info(`\nData written to file`)
        });
        res.json(notes);
        }
    });
});

module.exports = router;
