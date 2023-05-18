const Student = require('../models/students');

// Student deatils page
module.exports.addStudent = async (req, res) => {
    
    return res.render('add_student', {
        title: 'Placement Cell | Add Students'
    })
}

// student details adding to db

module.exports.createStudent = async (req, res) => {
    
    let checkStudent = await Student.findOne({email: req.body.email});

    if(!checkStudent) {
        let student = await Student.create({
            name: req.body.name,
            email: req.body.email,
            batch: req.body.batch,
            status: req.body.status,
            courseMarks: [req.body.dsa_mark, req.body.fe_mark, req.body.be_mark]
        });

        if(student) {
            res.redirect('/')
        }

        else {
            res.redirect('back')
        }
    }

    else {
        res.redirect('back');
    }
}