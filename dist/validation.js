"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePatchFieldsMiddleware = exports.validatePostFieldsMiddleware = void 0;
const validateFields = (fields) => {
    if (fields.age && (!Number.isInteger(fields.age) || fields.age < 16)) {
        return { error: "Age must be 16 or older" };
    }
    if (fields.name && !/^[a-zA-Z]+$/.test(fields.name)) {
        return { error: "Name must contain only letters" };
    }
    return null;
};
const validatePostFieldsMiddleware = (req, res, next) => {
    const requiredFields = ['name', 'age', 'degree'];
    const fields = req.body;
    // Check if all required fields are present
    for (const field of requiredFields) {
        if (!fields.hasOwnProperty(field)) {
            return res.status(400).json({ error: `Field '${field}' is required` });
        }
    }
    // Check if any additional fields are present
    for (const field in fields) {
        if (!requiredFields.includes(field)) {
            return res.status(400).json({ error: `Field '${field}' is not allowed` });
        }
    }
    const fieldValidationResult = validateFields(fields);
    if (fieldValidationResult) {
        return res.status(400).json(fieldValidationResult);
    }
    next();
};
exports.validatePostFieldsMiddleware = validatePostFieldsMiddleware;
const validatePatchFieldsMiddleware = (req, res, next) => {
    const allowedFields = ['name', 'age', 'degree']; // Define the allowed fields for PATCH
    const fields = req.body;
    // Check if any additional fields are present
    for (const field in fields) {
        if (!allowedFields.includes(field)) {
            return res.status(400).json({ error: `Field '${field}' cannot be updated` });
        }
    }
    const fieldValidationResult = validateFields(fields);
    if (fieldValidationResult) {
        return res.status(400).json(fieldValidationResult);
    }
    next();
};
exports.validatePatchFieldsMiddleware = validatePatchFieldsMiddleware;
