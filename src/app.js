const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');


const app = express();

app.use(express.json());
/* middleware is used to parse the incoming request body in JSON format and 
make it available under the req.body property of the request object.
 This allows you to easily access and 
 manipulate the data sent by the client in the request body. */
app.use(cookieParser());
/* middleware is used to parse the cookies sent by the client in the request headers.
 It makes the cookies available under the req.cookies property of the request object. 
 This allows you to easily access and manipulate the cookies sent by the client. */  
app.use('/api/auth', authRoutes);
/* This line of code is setting up a route for the Express application. 
It specifies that any requests made to the path '/api/auth' will be handled by the authRoutes router. 
The authRoutes router is defined in the './routes/auth.routes' file and
 contains the logic for handling authentication-related routes.By usingthisline of code,
 you are telling the Express application to use the authRoutes router for any requests that match the specified path. */
app.use('/api/music', musicRoutes);
/* This line of code is setting up a route for the Express application. 
It specifies that any requests made to the path '/api/music' will be handled by the musicRoutes router. 
The musicRoutes router is defined in the './routes/music.routes' file and contains the logic for handling music-related routes. 
By using this line of code, you are telling the Express application to use the musicRoutes router for any requests that match the specified path. */


module.exports = app;