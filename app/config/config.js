
require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  ENVIRONMENT: process.env.SERVER,

  AUTH: process.env.AUTH,

  DB: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  KEY:{
    secret:process.env.SECRET
  }
};
