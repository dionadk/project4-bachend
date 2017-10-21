const mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose');
// var ObjectId = Schema.ObjectId

var UserSchema = new Schema({
  username: String,
  email: String,
  password: String
});
UserSchema.plugin(passportLocalMongoose);


var User = mongoose.model('User', UserSchema);
module.exports = mongoose;
