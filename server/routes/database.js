const express = require('express');
const dbController = require('../controllers/databaseController');
const router = express.Router();

// get/verify current user, get a list of all of their friends, and all of their NOT friends
/*
Expects:
Returns: 
*/
router.get('/login', dbController.verifyUser, dbController.getFriendList, dbController.getNotFriendList, (req, res) => {
  return res.json(res.locals);
});

// post/create a new user (encrypt password)
/*
Expects:
Returns: 
*/
router.post('/signup', dbController.addUser, (req, res) => {
  return res.status(201).json(res.locals);
});

// TODO! - get this going
// put/update current user's data (location, interests)
/*
Expects:
Returns: 
*/
router.put('/', dbController.updateUser, (req, res) => {
  return res.status(201).json(res.locals.user);
})

// add two users to the "friends" table, get the new friends list of current user, get the new NOT friends list of current user
/*
Expects:
Returns: 
*/
router.post('/friend', dbController.addFriend, dbController.getFriendList, dbController.getNotFriendList, (req, res) => {
  return res.status(201).json(res.locals)
})

router.get('/coordinates', dbController.getCoords, (req, res) => {
  return res.status(200).json(res.locals.coords);
})
// TODOS //

// delete/remove user from friend list

// let other user confirm whether or not to be friends

module.exports = router;