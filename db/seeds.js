const mongoose = require('./connection')
var User = mongoose.model('User')
var Group = mongoose.model('Group')
var Access = mongoose.model('Access')

user1 = new User({
  username: 'dio',
  email: 'dio@gmail.com',
  password: 'test12345'
})
user2 = new User({
  username: 'kurien',
  email: 'kk@gmail.com',
  password: 'password12345'
})

user1group = new Group({
    groupname: 'dk',
    user: user1._id
})

userSeeds = [user1,user2]
groupSeeds = [user1group]

User.remove({})
.then(() => {
  User.collection.insert(userSeeds)
})

Group.remove({})
.then(() => {
  Group.collection.insert(groupSeeds)
  .then(() => {
    process.exit()
  })
})
