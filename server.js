
const express = require("express");
const cors = require("cors");
const config = require("./app/config/config");
const app = express();

//cors provides Express middleware to enable CORS
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Home route

app.get("/", (request, response) => {
  response.status(200).json({ message: "Welcome to Patricia BackEnd Challenge." });
});

// Other routes

require("./app/routes/auth.routes")(app);


app.all("*", (request, response) => {
 
  response.status(502).json({
    status: false,
    message: "Invalid request",
  });
});

// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
