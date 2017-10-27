const mongoose = require('mongoose')
var Schema = mongoose.Schema
// var passportLocalMongoose = require('passport-local-mongoose');
var ObjectId = Schema.ObjectId

var UserSchema = new Schema({
  userName: String,
  email: String,
  password: String,
});

var GroupSchema = new Schema({
  groupName: String,
  memberEmail: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  users: [UserSchema]
});

// UserSchema.plugin(passportLocalMongoose);

var TodoSchema = new Schema({
  item: String,
  isCompleted: false,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

var JournelSchema = new Schema({
  moment: String,
  place: String,
  image: String,
  date: String,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

let uri = 'mongodb://project4:password4@ds227525.mlab.com:27525/trip_db'
mongoose.connect(uri, function(err, db) {
    if(err) {
        console.log('Error, unable to connect to db')
        return
    }
})
// mongoose.connect('mongodb://localhost/project4-backend')

if (process.env.NODE_ENV == "production") {
    mongoose.connect(process.env.MLAB_URL)
} else {
    mongoose.connect("mongodb://localhost/project3-back")
}

var User = mongoose.model('User', UserSchema);
var Group = mongoose.model('Group', GroupSchema);
// var Access = mongoose.model('Access', AccessSchema);
var Todo = mongoose.model('Todo', TodoSchema);
var Journel = mongoose.model('Journel', JournelSchema);
module.exports = mongoose;
