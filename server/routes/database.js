const express = require('express');
const databaseController = require('../controllers/databaseController');
const router = express.Router();

// get list of all users
router.get('/', databaseController.getAllOtherUsers, (req, res) => {
  return res.status(200).json(res.locals.users);
})

// post a new user (encrypt password)
router.post('/', databaseController.addUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

// verify a single user
router.get('/', databaseController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.user)
})
// update a user

// get a list of all friends of one user

// get a pair of users and their coordinates

// post to friends table with user1_id: current user, user2_id, selected user

module.exports = router;