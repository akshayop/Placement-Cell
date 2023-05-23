const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const downloadController = require('../controllers/download_controller');


console.log('router loaded');

router.get('/', homeController.home);
router.get('/downloads', downloadController.download)
router.use('/users', require('./users'));
router.use('/students', require('./students'));
router.use('/interview', require('./interviews'));


module.exports = router;