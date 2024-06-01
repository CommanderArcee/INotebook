const express = require("express");
const { getRecordsOnUserId } = require("../Services/dbMethods");
const LoggedInUserDetails = require("../middleware/authLoggedInUser");
const { handleEmptyTitle, handleEmptyDescriton } = require('../validations/validation');
const { validationResult } = require("express-validator");
const { Notes, Users } = require("../dbConfig");
const { where, Op } = require("sequelize");
const router = express.Router();

// Router 1:-> In this we get all notes on the basis of logged in user. So, login requried.
router.get('/api/notes/getallnotes',
    LoggedInUserDetails,
    async (req, res) => {
        try {
            const { UserId } = req.user;
            const allRecordsofUser = await getRecordsOnUserId(UserId);
            res.send(allRecordsofUser);
        }
        catch (err) {
            console.log(err);
        }
    });


router.post('/api/notes/createnotes',
    LoggedInUserDetails,
    [handleEmptyTitle, handleEmptyDescriton],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.send(error);
        }
        try {
            const { title, description } = req.body;
            const newNotes = {
                Title: title,
                Description: description,
                user_id: req.user.UserId,
                Date: Date.now()
            };
            const result = await Notes.create(newNotes);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    });


// Update Notes Api :- In this requried login    
router.put('/api/notes/updatenote/:id', LoggedInUserDetails, async (req, res) => {
    try {
        // this id means notesId of notes because we edit the notes.
        const { title, description } = req.body;
        // we get id from req.params
        const updatedNotes = {};
        if (title) { updatedNotes.Title = title };
        if (description) { updatedNotes.Description = description };

        let getNote = await Notes.findByPk(req.params.id);
        if (!getNote) {
            return res.status(401).send("Invalid Notes");
        }

        if (getNote.user_id !== req.user.UserId) {
            return res.status(401).send("Invalid User");
        };

        let getUpdatedNote = await Notes.update(updatedNotes,
            {
                where: { NotesId: getNote.NotesId }
                // By this way we use and in the where clause or in code we can say where object.
                // and is the method inside the Op object of sequelize. This given by sequelize.
                /* where: {
                    [Op.and] : [{NotesId: getNote.NotesId}, {user_id : req.user.UserId}]
                } */
            }
        );

        res.send(getUpdatedNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Delete Notes Api :- In this requried login    
router.post('/api/notes/delete/:id', LoggedInUserDetails, async (req, res) => {
    try {
        // req.params.id -> it means we get that notes which user click and that id we insert in the api.
        let getNote = await Notes.findByPk(req.params.id);
        if (!getNote) {
            return res.status(401).send("Invalid Notes");
        }

        if (getNote.user_id !== req.user.UserId) {
            return res.status(401).send("Invalid User");
        };

        let getUpdatedNote = await Notes.destroy({
            where: { NotesId: getNote.NotesId }
        });

        res.send("Deleted Successfully");

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;