/* eslint-disable no-unused-vars */
const sql = require("../config/dbConnect");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcryptjs");

//Register a new user
exports.signup = (request, response) => {
  const email = request.body.mail;
  const password = bcrypt.hashSync(req.body.password, 8);
  const firstname = request.body.firstname;
  const lastname = request.body.lastname;

  //Check to see if user already exists
  const findUserQuery = `SELECT email FROM user WHERE email="${email}"`;

  sql.query(findUserQuery, (err, findUserData) => {
    if (err) {
      return response.status(500).json({
        status: false,
        message: "Authentication failed. Server Error",
        err,
      });
    }
    //Check if there is a user with that email address
    if (findUserData.length > 0) {
      return response.status(400).json({
        status: false,
        message: "User already registered, try sign in",
      });
    }
    //If there is no user with that email address, then proceed and create a user
    if (findUserData.length < 1) {
      const saveNewUserQuery = `INSERT INTO user SET ?`;
      const newUserData = {
        email,
        password,
        lastname,
        firstname,
      };
      sql.query(saveNewUserQuery, newUserData, (err, newUserData) => {
        if (err) {
          return response.status(500).json({
            status: false,
            message: "Server Error While new saving user data",
            err,
          });
        }
        const timestamp = Math.floor(Date.now() / 1000);
        let token = jwt.sign(
          { mail: email, iat: timestamp },
          config.KEY.secret,
          {
            algorithm: "HS512",
            expiresIn: "24h",
          }
        );

        return response.status(201).json({
          status: true,
          message: "User has been registered successfully",
          jwt: token,
        });
      });
    }
  });
};

// Sign in an existing User

exports.signin = async (request, response) => {
  const email = request.body.mail;
  const password = request.body.password;

  const userQuery = `SELECT email, password FROM user WHERE email="${email}"`;

  sql.query(userQuery, (err, userData) => {
    if (err) {
      return response.status(500).json({
        status: false,
        message: "Authentication failed. Server Error",
        err,
      });
    }

    if (userData.length > 0) {
      
      const savedPassword = userData[0].password;
      const passwordIsValid = await bcrypt.compareSync(password, savedPassword);

      if (!passwordIsValid)
        return response.status(400).json({
          message: "Incorrect Login Credentials!",
        });

      const timestamp = Math.floor(Date.now() / 1000);
      let token = jwt.sign(
        { email: email, iat: timestamp },
        config.KEY.secret,
        {
          algorithm: "HS512",
          expiresIn: "24h",
        }
      );
      return response.status(200).json({
        status: true,
        message: "User signed in",
        token: token,
        email: userData[0].email
      });
    } else {
      return response.status(404).json({
        status: false,
        message: "Incorrect login credentials, try again later",
      });
    }
  });
};
