const User = require('../models/user');


// Render the sign up page
module.exports.signUp = (req, res) => {

    if(req.isAuthenticated()) {
        return res.redirect('/');
    }

    return res.render('sign_up', {
        title: 'Placement Cell | Sign Up'
    });
}

// render the sign in page

module.exports.signIn = (req, res) => {

    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('sign_in', {
        title: 'Placement Cell | Sign In'
    })
}

// get the sign up data

module.exports.create = async (req, res) => {
    try{
        if(req.body.password != req.body.confirmPassword) {
            req.flash('error', "Password didn't matched. Try again!")
            return res.redirect('back');
        }

        let user = await User.findOne({email: req.body.email}); // find the user by email

        // if not found

        if(!user) {

            // Create new user

            User.create(req.body).then(() => {
                req.flash('success', "Successfully signed up")
                return res.redirect('/users/sign-in')
            })
            .catch( (err) => {
                req.flash('error', "Something went wrong while creating User")
                return res.redirect('back');
            });
        }

        else {
            req.flash('warning', "User already exists!")
            return res.redirect('back');
        }

    }catch(err){
        console.log("error",err);
        return res.redirect('back');
    }
}

// sign in create the session for the user

module.exports.createSession = (req, res) => {
    req.flash('success', 'successfully signed in');
    return res.redirect('/');
}

// removing the session from the db

module.exports.destroySession = (req, res, next) => {
    req.logout( (err) => {
        if(err)  {
            return next()
        }
        req.flash('success', 'You have logged out!');
        return res.redirect('/');
    });
}
