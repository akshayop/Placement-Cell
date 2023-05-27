const Student = require('../models/students');
const Interview = require('../models/interview');

//  Find student and populate interviews\
let checkstudent = async (id) => {
    let student = await Student.findById(id)
        .populate({path: 'interview'});

    return student;
}

// Student deatils page
module.exports.addStudent = async (req, res) => {
    
    //checking user is authenticated or not
    // iff true, return the details to ejs tobe displayed 
    if(req.isAuthenticated()) {

        return res.render('add_student', {
            title: 'Placement Cell | Add Students'
        });
    }

    // redirect to sign in

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

        // if student details is created 
        if(student) {
            req.flash('success', 'Student details added')
            res.redirect('/')
        }

        // if student details is not created
        else {
            req.flash('error', 'Failed to add student details')
            res.redirect('back')
        }
    }

    else {
        req.flash('warning', 'User alredy exists')
        res.redirect('back');
    }
}

// showing the details of the student

module.exports.showDetails = async (req, res) => {

    try{

        let student = await checkstudent(req.params.id);

        if(student) {
            return res.render('student_profile', {
                title: "Placement Cell | Student Details",
                student: student
            });
        }

        else{
            res.redirect('back');
        }

    }catch(err) {
        req.flash('error', err)
       return res.redirect('back');
    }
}   


// editing the student detials

module.exports.editDetails = async (req, res) => {

    try {
        let student = await checkstudent(req.params.id);

        if(student) {
            return res.render('update_student', {
                title: 'Placement Cell | Student Deatils',
                student: student,
                
            });
        }

        else {
            res.redirect('back');
        }
    }catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

// Updating the details of the student
module.exports.updateStudent = async (req, res) => {

    let student = await checkstudent(req.params.id);

    if(req.body.company_name) {
        let company = await Interview.findOne({company_name: req.body.company_name});

        // checking whether interview exists or not
        if(!company) {
            company = await Interview.create({
                company_name: req.body.company_name,
                date: req.body.interview_date,
                students: [{
                    student: student._id,
                    result: req.body.status
                }]
            });
        }

        else {
            let students = company.students;
            let insert = true;

            for(stud of students) {
                if(stud.student == req.params.id) {
                    insert = false;
                }
            }

            if(insert) {
                students.push({
                    student: student._id,
                    result: req.body.status
                });
            }

            await Interview.findByIdAndUpdate(company._id, {
                students: students, result:req.body.status
            });

            company = await Interview.findById(company._id);
        }

        let interview = student.interview;
        let insert = true;

        // check whether company alredy exists in student or not

        for(iv of interview) {
            if(iv.id == company.id) {
                insert = false;
            }
        }

        if(insert) {
            interview.push(company._id);
        }

        await Student.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            interview: interview
        });
    }

    else {
        await Student.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email
        });
    }

    req.flash('success', 'Student Details updated successfully');
    return res.redirect('/');
}


// delete the student deatails and assigned interviews

module.exports.destroy = async (req, res) => {
    try {
        let student = await checkstudent(req.params.id);

        if(!student) {
            req.flash('error', "couldn't find student");
            return;
        }

        const assignedInterviews = student.interview;

        // deleting the student from the enrolled company

        if(assignedInterviews.length > 0) {
            for(let interview of assignedInterviews) {
                await Interview.findOneAndUpdate({
                    company_name: interview.company_name},
                    {$pull: {students: {student: req.params.id}}
                });
            }
        }

        await Student.findByIdAndDelete(req.params.id);
        req.flash('success', 'student removed');
        return res.redirect('back');

    }catch (err){
        req.flash('error', err);
        return res.redirect('back');
    }
}