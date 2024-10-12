const router = require('express').Router();
const { carValidation, validate, validateID} = require('../utilities/validator.js');
const {isAuthenticated} = require('../middleware/authenticate')

const carController = require('../controllers/cars');

router.get('/', carController.allCars);

router.get('/:id', validateID, carController.getCar);

router.post('/', isAuthenticated, carValidation(), validate, carController.createCar);

router.put('/:id', isAuthenticated, validateID, carValidation(), validate, carController.updateCar);

router.delete('/:id', isAuthenticated, validateID, carController.deleteCar);

module.exports = router;
