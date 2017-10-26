const mongoose = require('./connection.js')
var User = mongoose.model('User')
var Group = mongoose.model('Group')
// var Access = mongoose.model('Access')
var Todo = mongoose.model('Todo')
var Journel = mongoose.model('Journel')



user1 = new User({
  userName: 'dio',
  email: 'dio@gmail.com',
  password: 'test12345'
})
user2 = new User({
  userName: 'kurien',
  email: 'kk@gmail.com',
  password: 'password12345'
})

group1 = new Group({
    groupName: 'dio@gmail.com',
    memberEmail: 'kk@gmail.com',
    creator: user1._id,
    users: [user1, user2]
})
// user1group = new Group ({
//   groupName: 'diona',
//   memberEmail: 'kk@gmail.com'
// })
user1Todo = new Todo({
    item: 'finish project',
    isCompleted: false,
    user: user1._id
})
user1Journel = new Journel({
    moment: 'amazing experience at Disney Land',
    place: 'Florida',
    image: 'nil',
    date: '',
    user: user1._id
})

userSeeds = [user1,user2]
groupSeeds = [group1]
todoSeeds = [user1Todo]
journelSeeds = [user1Journel]

User.remove({})
.then(() => {
  User.collection.insert(userSeeds)
})

Group.remove({})
.then(() => {
  Group.collection.insert(groupSeeds)
})


Todo.remove({})
.then(() => {
  Todo.collection.insert(todoSeeds)
})

Journel.remove({})
.then(() => {
  Journel.collection.insert(journelSeeds)
  .then(() => {
      process.exit()
  })
})
