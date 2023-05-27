const mongoose = require("mongoose");

// It is a Schema for the Student which contains some basic details of the student 
// And also contains, one array, it will contains the details of the interview which students has applied 

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