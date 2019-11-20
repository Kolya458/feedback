const Ajv = require('ajv');
const ajv = Ajv({allErrors: true, jsonPointers:true, removeAdditional:'all'});
require('ajv-errors')(ajv, {singleError: true});

const signUpSchema = require('./schema/signUp.schema');
const loginSchema = require('./schema/login.schema');
ajv.addSchema(signUpSchema, 'sign-up');
ajv.addSchema(loginSchema, 'login');

ajv.addKeyword('isNotEmpty', {
    type: 'string',
    validate: function (schema, data) {
      return typeof data === 'string' && data.trim() !== ''
    },
    errors: false
  })

const errorResponse = schemaErrors => {
    const errors = schemaErrors.map(err => {
        return {
            path: err.dataPath,
            message: err.message
        }
    });
    return {
        status: 'failed',
        errors
    }
}

module.exports = (schemaName) => {
    return (req, res, next) => {
        const isValid = ajv.validate(schemaName, req.body);
        if (!isValid) {
            res.status(400).json(errorResponse(ajv.errors));
        } else {
            next();
        }
    }
};