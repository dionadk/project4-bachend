const mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose');
var ObjectId = Schema.ObjectId

var UserSchema = new Schema({
  username: String,
  email: String,
  password: String
});
// UserSchema.plugin(passportLocalMongoose);

var GroupSchema = new Schema({
  groupName: String,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

var AccessSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  group: {
    type: Schema.ObjectId,
    ref: 'Group'
  }
})
var TodoSchema = new Schema({
  item: String,
  isCompleted: false,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

// let uri = 'mongodb://dionadk:project4@ds227525.mlab.com:27525/trip_db'
// mongoose.connect(uri, function(err, db) {
//     if(err) {
//         console.log('Error, unable to connect to db')
//         return
//     }
// })
mongoose.connect('mongodb://localhost/project4-backend')

var User = mongoose.model('User', UserSchema);
var Group = mongoose.model('Group', GroupSchema);
var Access = mongoose.model('Access', AccessSchema);
var Todo = mongoose.model('Todo', TodoSchema);
module.exports = mongoose;
