const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://127.0.0.1:27017/placementCell');

db.then( () => {
    console.log("successfully connected to mongodb");
}).catch( (err) => {
    console.log("Error while connect db:", err);
});

module.exports = db;