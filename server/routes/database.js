const express = require('express');
const dbController = require('../controllers/databaseController');
const router = express.Router();

// get/verify current  user //!TEST make sure that response status returns 200
router.get('/login', dbController.verifyUser, dbController.getFriendList, dbController.getNotFriendList, (req, res) => {
  // status
  // verified
  // message
  // user
  // friends
  return res.status(200).json(res.locals);
});

// post/create a new user (encrypt password)
router.post('/signup', dbController.addUser, dbController.getNotFriendList, (req, res) => { //!Test make sure response is 201
  return res.status(201).json(res.locals);
});

// put/update current user's data (location, interests)
// router.put('/', dbController.updateUser, (req, res) => {
//   return res.status(201).json(res.locals.user);
// })

//!Test make sure response is 201
router.post('/friend', dbController.addFriend, dbController.getFriendList, dbController.getNotFriendList, (req, res) => {
  return res.status(201).json(res.locals)
})

//!Test make sure response is 200
router.get('/coordinates', dbController.getCoords, (req, res) => {
  return res.status(200).json(res.locals.coords);
})
// TODOS //

// add/get/post user to friend list

// delete/remove user from friend list

// ???? post to friends table with user1_id: current user, user2_id, selected user

// TODO! add friends, delete friends

module.exports = router;