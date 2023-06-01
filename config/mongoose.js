const mongoose = require('mongoose');

mongoose  
    .connect('mongodb+srv://akshaynaik5787:Akshay123@skilltest.pdpmace.mongodb.net/placement-Cell?retryWrites=true&w=majority')
    .then(()=>{console.log("db connected")})
    .catch((err)=>{console.log("db not connected..", err)})

let db = mongoose.connection;

db.on('error', ()=>{console.error.bind(console,'something wrong in connection')});

db.once('open',()=>{console.log("db connection successfull...")});

module.exports = db;