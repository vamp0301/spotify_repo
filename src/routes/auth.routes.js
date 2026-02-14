const express = require('express');
const authController = require('../controller/auth.controller');

const router = express.Router();
  

router.post('/register', authController.registerUser);
/* This line of code is defining a route for the Express application. 
It specifies that when a POST request is made to the '/register' path, 
the registerUser function from the authController will be executed to handle the request. 
The registerUser function is responsible for processing the registration logic, 
such as validating the input data, creating a new user in the database, and sending an appropriate response back to the client. */
router.post('/login', authController.loginUser);
/* This line of code is defining a route for the Express application. 
It specifies that when a POST request is made to the '/login' path, 
the loginUser function from the authController will be executed to handle the request. 
The loginUser function is responsible for processing the login logic, 
such as validating the input data, checking the user's credentials against the database, and sending an appropriate response back to the client. */

module.exports = router;