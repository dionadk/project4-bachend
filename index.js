
// require express and other modules
const express = require('express')
const parser = require('body-parser')
let mongoose = require('./db/connection.js')
const cors =require('cors')
const app = express()

const User = mongoose.model('User')
const Group = mongoose.model('Group')
const Access = mongoose.model('Access')


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

//     app.use(express.static(__dirname + '/public'));
//
// // set view engine to hbs (handlebars)
//     app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    User.find({})
    .then((user) => {
        res.json(user)
    })
})
app.get('/groups', (req, res) => {
    Group.find({})
    .then((groups) => {
        res.json(groups)
    })
})

app.post('/signup', function (req, res) {
// if user is logged in, don't let them sign up again
    if (!req.user) {
      return res.redirect('/');
    }

    var new_user = new User({ username: req.body.username });
    User.register(new_user, req.body.password,
      function (err, newUser) {
        passport.authenticate('local')(req, res, function() {
          console.log("SIGNUP SUCCESS")
          res.redirect('/');
        });
      }
    );
});

app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(JSON.stringify(req.user));
  res.redirect('/')
});

app.get('/logout', function (req, res) {
  console.log("BEFORE logout", req.user);
  req.logout();
  console.log("AFTER logout", req.user);
  res.redirect('/');
});

app.get('/creategroup', (req,res) => {
  Group.create(req.body)
       .then((group) => {
         res.json(group)
       })
})

app.get('/:userId/groups', (req, res) => {
    Group.find({user: req.params.userId})
    .then((groups) => {
        res.json(groups)
    })
})




    // listen on port 3000
app.listen(3000, function() {
  console.log('server started');
});
