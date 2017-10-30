
// require express and other modules
const express = require('express')
const parser = require('body-parser')
const mongoose = require('./db/connection.js')
const cors = require('cors')
const app = express()
const User = mongoose.model('User')
const Group = mongoose.model('Group')
// const Access = mongoose.model('Access')
const Todo = mongoose.model('Todo')
const Journel = mongoose.model('Journel')


    //  NEW ADDITIONS
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

    // middleware for auth
    app.use(parser.urlencoded({extended:false}))
    app.use(parser.json())
    app.use(cors());
    app.use(cookieParser());
    app.use(session({
      secret: 'supersecretkey', // change this!
      resave: false,
      saveUninitialized: false
    }));
    // app.use(passport.initialize());
    // app.use(passport.session());
    //
    // // passport config
    // passport.use(new LocalStrategy(User.authenticate()));
    // passport.serializeUser(User.serializeUser());
    // passport.deserializeUser(User.deserializeUser());

//     app.use(express.static(__dirname + '/public'));
//
// // set view engine to hbs (handlebars)
//     app.set('view engine', 'hbs');

app.get('/api/users', (req, res) => {
  User.find({}).then((user) => {
    res.json(user)
    console.log("hi")
  })
})
//sign up
app.post("/api/users", (req, res) => {
User.findOne({email: req.body.email}).then((user) => {
  if(user == null){
      User.create(req.body).then(user => {
        res.json(user)
      });
  }
  else {
    res.json(null)
  }
})
});

//login
app.post("/api/login", (req,res) => {
  console.log(req.params);
  User.findOne({email: req.body.email, password: req.body.password})
  .then((user) => {
    console.log(user);
    if(user == null)
      res.json(null)
    else
      res.json(user)
  })
})
//login to shared account
app.post("/api/grouplogin", (req,res) => {
  //find if user exists
  User.findOne({email: req.body.email,password: req.body.password})
  .then((user) => {
    if(user == null)
      res.json(null)
    else {
      //find the shared group and access that page
    Group.findOne({groupName: req.body.groupEmail})
    .then((group) => {
        if(group == null)
          res.json(null)
        else
      console.log(group.creator)
          res.json(group.creator)
        });
      }
    })
  })
//end of user login sign up and grouplogin

app.get("/api/users/:userId", (req,res) => {
  User.findOne({_id: req.params.userId})
  .then((user) => {
    res.json(user)
  })
})

//get all groups
app.get('/api/groups',(req,res) => {
  Group.find({})
  .then((groups) => {
    res.json(groups)
  })
})

app.post('/api/createGroup', (req, res) => {
  console.log(req.groupName)
  Group.findOne({groupName: req.body.groupName}).then((group) => {
    console.log(group)
    if(group == null){
      Group.create(req.body).then(group => {
        res.json(group)
      })
    }
    else {
      res.json(null)
    }
  })
})

// add a member to group
app.post('/api/addMember', (req,res) => {
  //check if member exists
  User.findOne({email: req.body.member}).then((user) => {
      res.json(user)
      //find the group and push member to group
    Group.findOne({creator: req.body.creator}).then((group) => {
      group.users.push(user)
      group.save((group) => {
        console.log(group)
        res.json(group)
      })
    })
  })
})

app.get('/api/users/:userId/groups', (req, res) => {
    Group.find({user: req.params.userId})
    .then((group) => {
        res.json(group)
    })
})
// end of group routes

app.get('/api/todos', (req, res) => {
    Todo.find({})
    .then((todos) => {
        res.json(todos)
    })
})

app.get('/api/users/:userId/todos', (req,res) => {
    Todo.find({user: req.params.userId})
    .then((todo) => {
      res.json(todo)
    })
})
app.post('/api/todos/:_id/updatetodo', function(req,res){
  Todo.findOneAndUpdate({_id: req.params._id},req.body,{new: true})
      .then((todo) => {
          res.json(todo);
  })
})

app.post('/api/todos/:_id/deletetodo', function(req, res){
  Todo.findOneAndRemove({_id: req.params._id}, function(){
    res.json("/")
  })
})

app.post('/api/todos', (req, res) => {
    Todo.create(req.body)
        .then((todo) => {
            res.json(todo)
        })
})
//end of todo crud functionality

app.get('/api/journels', (req, res) => {
    Journel.find({})
    .then((journel) => {
        res.json(journel)
    })
})
app.post('/api/journels/:_id/updatejournel', function(req,res){
  console.log("hi there")
  Journel.findOneAndUpdate({_id: req.params._id},req.body,{new: true})
      .then((journel) => {
          res.json(journel);
  })
})

app.post('/api/journels', (req, res) => {
    Journel.create(req.body)
        .then((journel) => {
          console.log(journel)
            res.json(journel)
        })
})

app.get('/api/users/:userId/journels', (req,res) => {
      Journel.find({user: req.params.userId})
      .then((journel) => {
        res.json(journel)
      })
})

app.post('/api/journels/:_id/deletejournel', function(req, res){
  Journel.findOneAndRemove({_id: req.params._id}, function(){
    res.json("/")
  })
})
//end of journel crud functionality

// passport authentication

// app.get('/', function (req, res) {
//   res.render('index', {user: JSON.stringify(req.user) + "|| null" });
// });
//
// app.get('/signup', function (req, res) {
//   // don't let the user signup again if they already exist
//   if (req.user) {
//     return res.redirect('/');
//   }
//   res.render('signup'); // signup form
// });
//
// app.get('/login', function (req, res) {
//   // if user is logged in, don't let them see login view
//   if (req.user) {
//     return res.redirect('/');
//   }
//
//   res.render('login'); // you can also use res.sendFile
// });
//
// app.post('/api/users', function (req, res) {
// // if user is logged in, don't let them sign up again
//     // if (!req.user) {
//     //   return res.redirect('/');
//     // }
//
//     var new_user = new User({
//     username: req.body.username,
//     email: req.body.email
//     // password: req.body.password
//   });
//     var user = new User();
//       //set the users information that comes from requests
//       user.username = req.body.username;
//       user.email = req.body.email;
//       user.password = req.body.password;
//
//     User.register(new_user, req.body.password,
//       function (err, newUser) {
//         passport.authenticate('local')(req, res, function() {
//           console.log("SIGNUP SUCCESS")
//           // res.redirect('/');
//           res.json({ success: true, message: 'Successfully created new user.' })
//         });
//       }
//     );
// });
//
//
// app.post('/login', passport.authenticate('local'), function (req, res) {
//   console.log(JSON.stringify(req.user));
//   res.redirect('/')
// });
//
// app.get('/logout', function (req, res) {
//   console.log("BEFORE logout", req.user);
//   req.logout();
//   console.log("AFTER logout", req.user);
//   res.redirect('/');
// });






    // listen on port 4000
    app.listen(process.env.PORT || 4000, function () {
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });
