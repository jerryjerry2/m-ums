const express = require('express');
const EmployeeController = require('../controllers/employee');

const router = express.Router();

//Get
router.get('/', EmployeeController.getAllEmployee);
router.get('/about', EmployeeController.getAbout);

//Create
router.get('/create', EmployeeController.getCreateEmployee);
router.post('/create', EmployeeController.postCreateEmployee);

//Edit
router.get('/edit/:id', EmployeeController.getEditEmployee);
router.post('/edit', EmployeeController.postEditEmployee);

//Delete
router.get('/delete/:id', EmployeeController.deleteEmployee);

module.exports = router;