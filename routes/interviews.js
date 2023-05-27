const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interview_controller');

router.get('/add-interviews', interviewController.addInterviews); //rendering the interview page
router.post('/create-interviews', interviewController.createInterviews); //creating a new interview
router.get('/show-details/:id', interviewController.showDetails); //rendering the interview details
router.post('/edit-details/:id', interviewController.editDetails); //editing the interview details
router.get('/delete-interview/:id', interviewController.destroy); //deleting the interviews

// exporting the router
module.exports = router;