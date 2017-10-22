const mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose');
// var ObjectId = Schema.ObjectId

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
module.exports = mongoose;
