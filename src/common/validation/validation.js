const Ajv = require('ajv');
const ajv = Ajv({allErrors: true, removeAdditional:'all'});
const signUpSchema = require('./schema/signUp.schema');
ajv.addSchema(signUpSchema, 'sign-up');

const errorResponse = schemaErrors => {
    const errors = schemaErrors.map(err => {
        return {
            path: err.dataPath,
            message: err.message
        };
    });
    return {
        status: 'failed',
        errors
    }
}

module.exports = (schemaName) => {
    return (req, res, next) => {
        const isValid = ajv.validate(schemaName, req.body.user);
        if (!isValid) {
            res.status(400).json(errorResponse(ajv.errors));
        } else {
            next();
        }
    }
};