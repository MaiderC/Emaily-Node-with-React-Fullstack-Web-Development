const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); // we have to require Users before so that passport can use the User model
require('./models/Survey');
require('./services/passport');  // We just require it without assigning, because we just want that script to run

// Using mongoose
mongoose.connect(keys.mongoURI);

const app = express(); // Set up configuration to listen to requests and send them to the handler

/*** MIDDLEWARES ***/
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
        keys: [keys.cookieKey] // key used to encrypt the cookie so that no-one gets our user id
    })
);

app.use(passport.initialize());
app.use(passport.session());
/*** MIDDLEWARES ***/

/*** ROUTING LOGIC ***/
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
// If none of the previous routers contemplate the request given, this will be executed:
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build")); //look the route up in client/build directory
    // If it does not exist, the next part exectes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client' , 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);