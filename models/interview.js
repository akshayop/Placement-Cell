const mongoose = require('mongoose');

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