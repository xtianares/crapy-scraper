let mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let NoteSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

let Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
