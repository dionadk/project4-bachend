const mongoose = require('./connection')
var User = mongoose.model('User')

// user1 = new User({
//   username: 'dio',
//   email: 'dio@gmail.com',
//   password: 'test12345'
// })
// user2 = new User({
//   username: 'kurien',
//   email: 'kk@gmail.com',
//   password: 'password12345'
// })
//
// userSeeds = [user1,user2]
//
// User.remove({})
// .then(() => {
//   User.collection.insert(userSeeds)
//   .then(() => {
//     process.exit()
//   })
// })
