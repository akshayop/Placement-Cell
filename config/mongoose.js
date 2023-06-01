const mongoose = require('mongoose');

const db = mongoose.connect('mongodb+srv://akshaynaik5787:Akshay123@skilltest.pdpmace.mongodb.net/placement-Cell?retryWrites=true&w=majority');

db.then( () => {
    console.log("successfully connected to mongodb");
}).catch( (err) => {
    console.log("Error while connect db:", err);
});

module.exports = db;