const { body, validationResult} = require('express-validator');
const ObjectID = require('mongodb').ObjectId;
const rules = {};

rules.userValidation = () => {
    return [
        body('firstName', 'Please enter your name').isLength({min:2, max:15}),
        body('lastName', 'Please enter your lastname').isLength({min:2, max:15}),
        body('DOB', 'Please enter a valid DOB (YYYY-MM-DD)').isDate(),
        body('email', "Please enter a valid email").isEmail(),
        body('age').isInt()
    ]
}
rules.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg}))

    return res.status(412).json( {
        errors: extractedErrors
    })
}
rules.validateID = (req, res, next) => {
    if (!ObjectID.isValid(req.params.id)) {
        res.status(400).json('Must use a valid id')
        return;
	}
	next();
}

rules.carValidation = () => {
    return [
        body('Make').isLength({min:2, max:15}),
        body('Model').isLength({min:2, max:15}),
        body('Year', 'Please enter a valid year (1945-2025)').if(body('Year', 'This field cannot be empty').notEmpty()).isInt({min: 1945, max:2025}),
        body('Color').notEmpty(),
        body('Engine').isFloat(),
        body('Miles').isInt(),
        body('FuelType').notEmpty(),
        body('Transmission').notEmpty()
    ]
}

module.exports = rules;