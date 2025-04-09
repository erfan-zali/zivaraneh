import { body, validationResult } from "express-validator";

// Validator chain for sign-up data
export const validateSignup = [
  body("firstName").trim().notEmpty().withMessage("نام کوچک الزامی است"), 

  body("lastName").trim().notEmpty().withMessage("نام خانوادگی الزامی است"), 

  body("username")
    .trim()
    .notEmpty()
    .withMessage("نام کاربری الزامی است") 
    .isAlphanumeric()
    .withMessage("نام کاربری باید فقط شامل حروف و اعداد باشد"), 

  body("email")
    .trim()
    .notEmpty()
    .withMessage("ایمیل الزامی است") 
    .isEmail()
    .withMessage("فرمت ایمیل معتبر نیست"), 

  body("password")
    .notEmpty()
    .withMessage("رمز عبور الزامی است") 
    .isLength({ min: 6 })
    .withMessage("رمز عبور باید حداقل ۶ کاراکتر باشد") 
    .matches(/[A-Z]/)
    .withMessage("رمز عبور باید حداقل یک حرف بزرگ داشته باشد") 
    .matches(/[0-9]/)
    .withMessage("رمز عبور باید حداقل یک عدد داشته باشد"), 

  // Custom sanitization (escape potentially harmful HTML input)
  body("email").normalizeEmail(),

  // Handle validation errors
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: result.array().map((err) => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }
    next();
  },
];
