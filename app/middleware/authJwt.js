/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const jwt = require("jsonwebtoken");
// const Sentry = require("../services/sentry")
module.exports = (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return response.status(401).json({
        status: false,
        message: "Authorization is required",
      });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      process.env.KEY,
      { algorithms: ["HS512"] },
      (err, user) => {
        if (err) {
          return response.status(401).json({
            status: false,
            message: "Invalid authentication token",
          });
        }
        request.email = user.email;
        next();
      }
    );
  } catch (error) {
    // Sentry.captureException(error);
    return response.status(500).json({
      status: false,
      message: "Problems authorising",
    });
  }
};