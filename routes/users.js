const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/sign-up', userController.signUp); //rendering sign up page
router.get('/sign-in', userController.signIn); //rendering the sign in page

router.post('/create', userController.create);
// use passport as a middleware authentication
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), userController.createSession);

router.get('/sign-out', userController.destroySession);

module.exports = router;