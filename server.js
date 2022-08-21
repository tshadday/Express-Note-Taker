const express = require('express');
const path = require('path');
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// GET Route for homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// GET /api/notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const savedNotes = JSON.parse(data);
            res.json(savedNotes);
        }
    })
});

//POST /api/notes
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

    if(req.body) {
        newNote = {
            title,
            text,
            note_id: uuidv4(),
        };
        fs.readFile('./db/db.json', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const newNote = JSON.parse(data);
                newNote.push(note);
                fs.writeFile('./db/db.json', JSON.stringify(note, null), (err) =>
                    err ? console.error(err) : console.log(`\nData written to ${destination}`)
                );

                res.status(200).json(response)
            }
        });
    };
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
