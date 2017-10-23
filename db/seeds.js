const mongoose = require('./connection')
var User = mongoose.model('User')
var Group = mongoose.model('Group')
var Access = mongoose.model('Access')
var Todo = mongoose.model('Todo')

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

user1group = new Group({
    groupName: 'dk',
    user: user1._id
})
user1Todo = new Todo({
    item: 'finish project',
    isCompleted: false,
    user: user1._id
})

userSeeds = [user1,user2]
groupSeeds = [user1group]
todoSeeds = [user1Todo]

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
  .then(() => {
      process.exit()
  })
})
