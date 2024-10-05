const { body, validationResult} = require('express-validator');
const ObjectID = require('mongodb').ObjectId;
const rules = {};

rules.userValidation = () => {
    // const test = body('firstName').notEmpty().isLength({min:2, max:15});
    return [
        body('firstName').notEmpty().isLength({min:2, max:15}),
        body('lastName').notEmpty().isLength({min:2, max:15}),
        body('DOB').notEmpty().isDate(),
        body('email').isEmail(),
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
        body('Make').notEmpty().isLength({min:2, max:15}),
        body('Model').notEmpty().isLength({min:2, max:15}),
        body('Year').notEmpty().isInt(),
        body('Color').notEmpty(),
        body('Engine').notEmpty().isFloat(),
        body('Miles').notEmpty().isInt(),
        body('FuelType').notEmpty(),
        body('Transmission').notEmpty()
    ]
}

module.exports = rules;