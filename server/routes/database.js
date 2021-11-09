const express = require('express');
const dbController = require('../controllers/databaseController');
const router = express.Router();

// get/verify current user, get a list of all of their friends, and all of their NOT friends
/*
Expects: 
  req.query = { username: string, password: string }
Returns: { 
    verified: boolean
    message: string
    user: userObject
    friendList: [ userObject ]
    notFriendList: [ userObject ]
  }

  userObject: { user_id: int, username: string, password: string, coordinates: { lat: num, lng: num } }Returns: 
*/
router.get('/login', dbController.verifyUser, dbController.getFriendList, dbController.getNotFriendList, (req, res) => {
  return res.json(res.locals);
});

// post/create a new user (encrypt password)
/*
Expects: 
  req.body = { username: string, password: string, address: string }
Returns: {
    verified = boolean,
    message = string,
    user = userObj,
    friendList: [ userObject ]
    notFriendList: [ userObject ]
  }
*/
router.post('/signup', dbController.addUser, dbController.getFriendList, dbController.getNotFriendList, (req, res) => {
  return res.status(201).json(res.locals);
});

// put/update current user's data (location, interests)
/*
Expects: 
  req.body = { user_id, newCoordinates }
Returns: 
  userObj;
*/
router.put('/', dbController.updateUser, (req, res) => {
  return res.status(201).json(res.locals.user);
})

// add two users to the "friends" table, get the new friends list of current user, get the new NOT friends list of current user
/*
Expects:
  req.body = { user1_id: int, user2_id: int }
Returns: {
  user: userObj,
  friendList: [ userObj ],
  notFriendList: [ userObj ],
}
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