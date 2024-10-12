const router = require('express').Router();
const { userValidation, validate, validateID} = require('../utilities/validator');
const {isAuthenticated} = require('../middleware/authenticate');

const userController = require('../controllers/users');

router.get('/', userController.allUsers);

router.get('/:id', validateID, validate, userController.getUser);

router.post('/', isAuthenticated, userValidation(), validate, userController.createUser);

router.put('/:id', isAuthenticated, validateID, userValidation(), validate, userController.updateUser);

router.delete('/:id', isAuthenticated, validateID, userController.deleteUser);

module.exports = router;