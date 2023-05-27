const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student_Controller');
const passport = require('passport');

router.get('/add-student', studentController.addStudent); //rendering add to student page
router.post('/create-student', studentController.createStudent); //creating new students
router.get('/delete-student/:id', studentController.destroy); //deleting the student 
router.get('/show-details/:id', studentController.showDetails); //rendering the details of the student
router.get('/edit-details/:id', studentController.editDetails); //renndering the edit page
router.use('/update-student/:id', studentController.updateStudent); //updating the student details


// exporting the router
module.exports = router;