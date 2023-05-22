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

    courseMarks: [],

    interview: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
    }]
}, {
    timestamps: true
});

const Students = mongoose.model('Students', studentsSchema);
module.exports = Students;