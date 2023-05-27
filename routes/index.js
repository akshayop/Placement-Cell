const express = require('express');
const router = express.Router(); 
const homeController = require('../controllers/home_controller'); //importing home controller from controllers
const downloadController = require('../controllers/download_controller'); //importing download controller from controllers


router.get('/', homeController.home); //rendering the home page
router.get('/downloads', downloadController.download); //rendering  downloads
router.use('/users', require('./users')); //User routes
router.use('/students', require('./students'));//student routes
router.use('/interview', require('./interviews')); //interview routes

// exporting the router
module.exports = router;