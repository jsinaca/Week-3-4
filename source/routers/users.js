const router = require('express').Router();
const { userValidation, validate, validateID} = require('../utilities/validator');

const userController = require('../controllers/users');

router.get('/', userController.allUsers);

router.get('/:id', validateID, validate, userController.getUser);

router.post('/', userValidation(), validate, userController.createUser);

router.put('/:id', validateID, userValidation(), validate, userController.updateUser);

router.delete('/:id', validateID, userController.deleteUser);

module.exports = router;