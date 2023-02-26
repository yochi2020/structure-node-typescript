import { check, validationResult } from "express-validator";

export const registerValidator = [
    check("password").isLength({ min: 4, max: 18 }).withMessage("must be at least 4 chars long"),
    check("email").isEmail().withMessage("Not an email")
];

export default validationResult;