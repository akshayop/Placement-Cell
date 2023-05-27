const Students = require('../models/students'); //importing the student schema from model
const Interview = require('../models/interview'); //importing the Interview schema  from model 

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
    // checking if user is authenticated or not
    // if true, then pass the details
    if(req.isAuthenticated()) {
        return res.render('add_interview', {
            title: 'Placement Cell | Add Interview'
        });
    }

    // else redirect to sign in page
    else {
        req.flash('error', 'Please sign in again!');
        res.redirect('/users/sign-in');
    }
}

// creating the Interview schema

module.exports.createInterviews = async (req, res ) => {

    // check if interview is already exists or not
    let checkInterview = await Interview.findOne({company_name: req.body.company_name});
    
    // checking if the user already present or not
    if(checkInterview) {
        req.flash('warning', 'Interview already exists');
        return re.redirect('back');
    }

    // if not present, then create interview 

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

// passing some details so that ejs can use it 

module.exports.showDetails = async (req, res) => {
    try {
        let interview = await checkInterview(req.params.id);

        return res.render('interview_profile', {
            title: 'Placement Cell | Interview Details',
            interview: interview
        })
    }catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

// editing the interviews

module.exports.editDetails = async (req, res) => {
    try {
        let interview = await checkInterview(req.params.id);

        let students = interview.students; //assigning a students inside interview schema to the students 

        for(let student of students) {
            // checking if the student is placed
            // if true, the update the student staus as placed
            if(req.body[`status-${student.student._id}`] == 'Passed') {
                await Students.findByIdAndUpdate(student.student._id, {status: "Placed"});
            }
            student.result = req.body[`status-${student.student._id}`];
        }

        await Interview.findByIdAndUpdate(interview._id, {students: students}); //else modify the interview
        return res.redirect('/');
    }catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

// destroying the interview deatils

module.exports.destroy = async (req, res) => {

    try {
        let interview = await checkInterview(req.params.id);

        if(!interview) {
            req.flash('error', 'failed to find interview');
            return;
        }

        const assign = interview.students;

        // checking if any student is registerd for interview
        // if true, then also delete in the student schema 
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

        await Interview.findByIdAndDelete(req.params.id); // deleting the interview 
        req.flash('success', 'Interview Deleted');
        return res.redirect('back');

    }catch(err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}