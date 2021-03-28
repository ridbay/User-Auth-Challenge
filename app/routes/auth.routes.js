// const { authJwt } = require("../middleware");
const { check } = require("express-validator");
const authController = require("../controllers/auth.controller");
const validateReqBody = require("../middleware/validateReqBody");

module.exports = function (app) {
  app.post(
    "/auth/signup",
    [
      check("email")
        .normalizeEmail()
        .isEmail()
        .withMessage("Please enter a valid email address"),

      check("password")
        .notEmpty()
        .isLength(4)
        .withMessage("Password is required and miniumum lenght of 4"),

      check("firstname")
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage("Enter your First name"),
      check("lastname")
        .notEmpty()
        .isLength({ min: 4 })
        .withMessage("Enter your last name"),
    ],
    validateReqBody,
    authController.signup
  );
  app.post(
    "/auth/signin",
    [
      check("email")
        .notEmpty()
        .isEmail()
        .withMessage("Please enter a valid email address"),

      check("password")
        .isLength(4)
        .withMessage("Password is required and miniumum lenght of 4"),
    ],
    validateReqBody,
    authController.signin
  );


};
