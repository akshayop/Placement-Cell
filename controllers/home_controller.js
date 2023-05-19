const passport = require('passport');
const Student = require('../models/students');
const Interview = require('../models/interview');

module.exports.home = async (req, res) => {
    
    if(req.isAuthenticated()) {

        let students = await Student.find({});
        let interviews = await Interview.find({});

        return res.render('home', {
            title: "Placement Cell | Home",
            students: students,
            interviews: interviews
        });
    }

    else{ 
        return res.redirect('/users/sign-in');
    }
    
}