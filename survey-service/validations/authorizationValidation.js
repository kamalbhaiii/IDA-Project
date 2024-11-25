const Joi = require('joi')

const authorizationValidation = Joi.object({
    authorization: Joi.string()
        .pattern(/^Bearer\s[\w-]+\.[\w-]+\.[\w-]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Invalid Bearer token format.',
            'any.required': 'Authorization header is required.',
        }),
});

const validateAuthorization = (req, res, next) => {
    const headers = { authorization: req.headers.authorization };

    // Validate the authorization header
    const { error } = authorizationValidation.validate(headers);

    if (error) {
        return res.status(401).json({ error: error.details[0].message });
    }

    // Extract and attach the token to the request object
    const token = headers.authorization.split(' ')[1];
    req.token = token;

    next();
};

module.exports = validateAuthorization