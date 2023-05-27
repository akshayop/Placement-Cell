const passport = require('passport');
const Student = require('../models/students');
const Interview = require('../models/interview');

// exporting  Home page controller

module.exports.home = async (req, res) => {
    
    // checking if user is authenticated or not
    // if true, then show the details
    if(req.isAuthenticated()) {

        let students = await Student.find({});
        let interviews = await Interview.find({});

        return res.render('home', {
            title: "Placement Cell | Home",
            students: students,
            interviews: interviews
        });
    }

    // else redirect to sign in pages
    else{ 
        return res.redirect('/users/sign-in');
    }
    
}