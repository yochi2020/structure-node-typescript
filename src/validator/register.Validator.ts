import { check } from "express-validator";

export const registerValidator = [
    check("password").isLength({ min: 4, max: 18 }).withMessage("must be at least 4 chars long"),
    check("password_confirm").isLength({ min:4,max:18 }).withMessage("must be at least 4 chars long")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password confirmation does not match password");
            }
            return true;
        }),
    check("first_name").isLength({ min:4,max:18 }).withMessage("must be at least 4 chars long"),
    check("last_name").isLength({ min:4,max:18 }).withMessage("must be at least 4 chars long"),
    check("email").isEmail().withMessage("Not an email")
];

