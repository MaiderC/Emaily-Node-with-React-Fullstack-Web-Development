const passport = require('passport');

module.exports = (app) => {

    // Specifically register the strategy to our route, with the "google" internal identifyier
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email'] // It specifies to Google what information we ant from the user that authenticates (there's a list of several scopes)
        })
    );

    // Handle the callback case - Using passport for it to get the code and restart the request automatically
    app.get(
        '/auth/google/callback',  
        passport.authenticate('google'),
        (req, res) => {
            res.redirect("/surveys");
        }
    );

    app.get(
        '/api/current_user',  
        (req, res) => {
            res.send(req.user);
        }
    );

    app.get(
        '/api/logout',  
        (req, res) => {
            req.logout(); // this outomatically deletes the cookie
            res.redirect("/");
        }
    );

};
