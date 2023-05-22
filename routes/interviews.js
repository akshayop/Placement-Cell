const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interview_controller');

router.get('/add-interviews', interviewController.addInterviews);
router.post('/create-interviews', interviewController.createInterviews);
router.get('/show-details/:id', interviewController.showDetails);
router.post('/edit-details/:id', interviewController.editDetails);
router.get('/delete-interview/:id', interviewController.destroy);

module.exports = router;