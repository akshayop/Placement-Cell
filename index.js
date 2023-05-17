const express = require('express');
const app = express();
const port = 8000; //Port number where our project runs
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// Used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');

const MongoStore = require('connect-mongo');


app.use(express.urlencoded());
app.use(express.static('./assets'));

app.use(expressLayouts);

// Extract the style and scripts from subpages into the layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setup the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookies in the db
app.use(session({
    name: 'placementCell',
    // todo change the secret before deployment in production mode
    secret: 'skillTest',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (10000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/sessions',
        autoRemove: 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// use express router
app.use('/', require('./routes'));

// checking the server is up or not
app.listen(port, (err)=> {
    // if error occurs 
    if(err) {
        console.log('Server hosting error', err);
    }

    //if the server is successfully hosted 
    console.log(`server is successfully running on port: ${port}`);
});
