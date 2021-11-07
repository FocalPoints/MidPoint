const express = require('express');
const dbController = require('../controllers/databaseController');
const router = express.Router();

// get/verify current  user
router.get('/', dbController.verifyUser, (req, res) => {
  return res.status(201).json(res.locals.userObj);
});

// post/create a new user (encrypt password)
router.post('/', dbController.addUser, (req, res) => {
  return res.status(201).json(res.locals.user);
});

// put/update current user's data (location, interests)
// router.put('/', dbController.updateUser, (req, res) => {
//   return res.status(201).json(res.locals.user);
// })

// list of current user's friends
router.get('/friends', dbController.getList, (req, res) => {
  return res.status(200).json(res.locals.users);
})

// get a pair of users from list of friends
router.get('/', dbController.getFriend, (req, res) => {
  return res.status(200).json(res.locals.user);
})

// TODOS //

// add/get/post user to friend list

// delete/remove user from friend list

// ???? post to friends table with user1_id: current user, user2_id, selected user

module.exports = router;