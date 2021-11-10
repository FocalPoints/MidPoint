const express = require('express');
const dbController = require('../controllers/databaseController');
const router = express.Router();

// get/verify current  user
router.get('/login', dbController.verifyUser, dbController.getFriendList, dbController.getNotFriendList, (req, res) => {
  // status
  // verified
  // message
  // user
  // friends
  return res.json(res.locals);
});

// post/create a new user (encrypt password)
router.post('/signup', dbController.addUser, (req, res) => {
  return res.status(201).json(res.locals);
});

// put/update current user's data (location, interests)
router.patch('/newaddress', dbController.updateUser, (req, res) => {
  return res.status(201).json(res.locals.user);
})

router.post('/friend', dbController.addFriend, dbController.getFriendList, dbController.getNotFriendList, (req, res) => {
  return res.status(201).json(res.locals)
})

//Add outside friend 
router.post('/outsideFriend', dbController.addOutsideFriend, (req, res) => {
  console.log('INSIDE OUTSIDE FRIEND API ROUTE')
  return res.status(201).json(res.locals.insert)
})

router.get('/coordinates', dbController.getCoords, (req, res) => {
  return res.status(200).json(res.locals.coords);
})
// TODOS //

// add/get/post user to friend list

// delete/remove user from friend list

// ???? post to friends table with user1_id: current user, user2_id, selected user

// TODO! add friends, delete friends

module.exports = router;