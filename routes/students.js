const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student_Controller');
const passport = require('passport');

router.get('/add-student', studentController.addStudent);
router.post('/create-student', studentController.createStudent);
router.get('/delete-student/:id', studentController.destroy);
router.get('/show-details/:id', studentController.showDetails);
router.get('/edit-details/:id', studentController.editDetails);
router.use('/update-student/:id', studentController.updateStudent);

module.exports = router;