const mongoose = require('mongoose');

// It is a schema for the interview, and it contains the basic informations like comapny name and date
// and also contains one arry, So that interview can store which student have ben entered for interviews

const interviewSchema = new mongoose.Schema({

    company_name: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    students: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Students'
        },

        result: {
            type: String,
            enum: [
                "Passed",
                "Failed",
                "On hold",
                "Didn't attempt",
                "Ongoing"
            ]
        }
    }]
}, {
    timestamps: true
});

const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;