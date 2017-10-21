
// require express and other modules
const express = require('express')
const bodyParser = require('body-parser')
let mongoose = require('./db/connection.js')
const cors =require('cors')
const app = express()

    //  NEW ADDITIONS
    cookieParser = require('cookie-parser')
    session = require('express-session')
    passport = require('passport')
    LocalStrategy = require('passport-local').Strategy;

    // middleware for auth
    app.use(parser.json())
    app.use(cors());
    app.use(cookieParser());
    app.use(session({
      secret: 'supersecretkey', // change this!
      resave: false,
      saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());


    // passport config
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.get('/signup', function (req, res) {
    res.sendFile('/views/signup.html', { root: __dirname });
    });
    
    app.post('/signup', function (req, res) {
      User.register(new User({ username: req.body.username }), req.body.password,
        function (err, newUser) {
          passport.authenticate('local')(req, res, function() {
            res.send('signed up!!!');
          });
        }
      );
    });
