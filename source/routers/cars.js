const router = require('express').Router();
const { carValidation, validate, validateID} = require('../utilities/validator.js');

const carController = require('../controllers/cars');

router.get('/', carController.allCars);

router.get('/:id', validateID, carController.getCar);

router.post('/', carValidation(), validate, carController.createCar);

router.put('./:id', validateID, carValidation(), validate, carController.updateCar);

router.delete('/:id', validateID, carController.deleteCar);

module.exports = router;
