const mongoose = require('mongoose');

// Now we create schema
const NotesSchema = new Schema({
    title: {
        type : String,
        requried : true
    },
    description : {
        type : String,
        requried : true
    },
    tag : {
        type : String,
        default : "General"
    },
    date : {
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model('notes', NotesSchema);
/* Syntax -> mongoose.model('tablename', schema which we have create); or isi method se hi userSchema ka table banega or able hoga dusri files mei use krme ke lie */
