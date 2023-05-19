const Student = require('../models/students');

// Student deatils page
module.exports.addStudent = async (req, res) => {
    
    if(req.isAuthenticated()) {

        return res.render('add_student', {
            title: 'Placement Cell | Add Students'
        });
    }

    else {
        req.flash('error', 'Please Sign in again...!');
        res.redirect('/users/sign-in');
    }
}

// student details adding to db

module.exports.createStudent = async (req, res) => {
    
    let checkStudent = await Student.findOne({email: req.body.email});
    // check if student is already exists or not

    // if not exits then create a student data
    if(!checkStudent) {
        let student = await Student.create({
            name: req.body.name,
            email: req.body.email,
            batch: req.body.batch,
            status: req.body.status,
            courseMarks: [req.body.dsa_mark, req.body.fe_mark, req.body.be_mark]
        });

        if(student) {
            req.flash('success', 'Student details added')
            res.redirect('/')
        }

        else {
            req.flash('error', 'Failed to add student details')
            res.redirect('back')
        }
    }

    else {
        re1.flash('warning', 'User alredy exists')
        res.redirect('back');
    }
}