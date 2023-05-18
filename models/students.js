const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    batch: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Placed", "Not Placed"],
        required: true
    },

    courseMarks: []
});

const Students = mongoose.model('Student', studentsSchema);
module.exports = Students;