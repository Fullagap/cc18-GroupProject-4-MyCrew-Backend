const Joi = require("joi");
const createError = require("../utils/createError");

const registerSchema = Joi.object({
   email: Joi.string()
       .email()  
       .required()
       .messages({
           "string.empty": "Email is required",
           "string.email": "Invalid email format"
       }),
   
   identicalNumber: Joi.string()
       .pattern(/^[0-9]{13}$/)
       .required()
       .messages({
           "string.empty": "Identity Card number is required",
           "string.pattern.base": "Identity Card number must contain only numbers and be exactly 13 characters"
       }),

   password: Joi.string()
       .pattern(/^[0-9a-zA-Z]{6,}$/)
       .messages({
           "string.pattern.base": "Password must contain letters and numbers and be at least 6 characters"
       }),

   phoneNumber: Joi.string()
       .pattern(/^\+?[0-9]{10,15}$/)
       .messages({
           "string.pattern.base": "Phone number must be 10 to 15 digits and can start with +"
       }),

   bookBank: Joi.string()
       .required()
       .messages({
           "string.empty": "BookBank is required"
       }),

   salary: Joi.number()
       .positive() 
       .messages({
           "number.base": "Salary must be a number",
           "number.positive": "Salary must be a positive number"
       })
}).unknown(true);  // Allow unknown fields without throwing an error

const validateSchema = (schema) => (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
        return createError(400, error.details[0].message);
    }
    req.input = value;
    next();
};

exports.registerValidator = validateSchema(registerSchema);
