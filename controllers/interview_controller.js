const Students = require('../models/students');
const Interview = require('../models/interview');

let checkInterview = async (id) => {
    let interview = await Interview.findById(id)
        .populate({
            path: 'students',
            populate: {
                path: 'student'
            }
        });

    return interview;
    
}

module.exports.addInterviews = (req, res) => {
    if(req.isAuthenticated()) {
        return res.render('add_interview', {
            title: 'Placement Cell | Add Interview'
        });
    }

    else {
        req.flash('error', 'Please sign in again!');
        res.redirect('/users/sign-in');
    }
}

module.exports.createInterviews = async (req, res ) => {

    // check if interview is already exists or not
    let checkInterview = await Interview.findOne({company_name: req.body.company_name});
    
    if(checkInterview) {
        req.flash('warning', 'Interview already exists');
        return re.redirect('back');
    }

    // if not there craete interview 

    let interview = await Interview.create({
        company_name: req.body.company_name,
        date: req.body.ineterview_date
    });

    if(interview) {
        req.flash('success', 'Added the Interview Details');
        res.redirect('/');
    }

    else {
        req.flash('error', 'Failed to create an Interview');
        res.redirect('back');
    }
}

module.exports.showDetails = async (req, res) => {
    try {
        let interview = await checkInterview(req.params.id);

        return res.render('interview_profile', {
            title: 'Placement Cell | Interview Details',
            interview: interview
        })
    }catch(err) {
        console.log("error", err);
    }
}

module.exports.editDetails = async (req, res) => {
    try {
        let interview = await checkInterview(req.params.id);

        let students = interview.students;

        for(let student of students) {
            if(req.body[`status-${student.student._id}`] == 'Passed') {
                await Students.findByIdAndUpdate(student.student._id, {status: "Placed"});
            }
            student.result = req.body[`status-${student.student._id}`];
        }

        await Interview.findByIdAndUpdate(interview._id, {students: students});
        return res.redirect('/');
    }catch (err) {
        console.log("error", err);
    }
}

module.exports.destroy = async (req, res) => {

    try {
        let interview = await checkInterview(req.params.id);

        if(!interview) {
            req.flash('error', 'failed to find interview');
            return;
        }

        const assign = interview.students;

        if(assign.length > 0) {

            for(let student of assign) {
                await Students.findOneAndUpdate({
                    id: student._id
                }, {
                    $pull: {
                        interview: {
                            interview: req.params.id
                        }
                    }
                });
            }
        }

        await Interview.findByIdAndDelete(req.params.id);
        req.flash('success', 'Interview Deleted');
        return res.redirect('back');

    }catch(err) {
        console.log("error while deleting interview", err);
    }
}