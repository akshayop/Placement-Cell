const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interview_controller');

router.get('/add-interviews', interviewController.addInterviews);
router.post('/create-interviews', interviewController.createInterviews);

module.exports = router;