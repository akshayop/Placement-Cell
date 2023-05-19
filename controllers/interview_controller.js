const Students = require('../models/students');
const Interview = require('../models/interview');

let checkInterview = async (id) => {
    let interview = await Interview.findById(id)
        .populate({
            path: 'students',
            populate: {
                path: 'students'
            }
        });

    return interview
    
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