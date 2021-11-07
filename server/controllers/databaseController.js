const db = require('../models/model');
const bcrypt = require('bcryptjs');
const dbController = {};

// get / verify current user
/*
Expects: req.body = {username, password}
Returns: {verified: bool, message: string, user: userObject}
User Object: {
  user_id: int,
  username: string,
  password: string,
  created_on: timestamp,
  coordinate: {
    lat: num,
    lng: num
  }
}
*/
dbController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  // if username / password is empty string / not a string throw error
  const query = `SELECT * FROM users WHERE users.username = $1`
  const values = [username];
  try {
    // send data via res locals
    const response = await db.query(query, values);
    if (!response.rows.length) {
      res.status(404).send({
        verified: false,
        message: 'User not found!',
        user: {},
      })
      return next();
    }
    const user = response.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).send({
        verified: false,
        message: 'Invalid password!',
        user: {},
      })
      return next();
    }
    else {
      res.locals.userObj = {
        verified: true,
        message: 'User verified',
        user: user,
      };
      return next();
    }
  } catch (err) {
    return next(err);
  }
}

// post/create a new user (encrypt password)
/* 
Expects: req.body: { username, password, coordinates }
Returns: [{ user_id: int,
  username: string,
  password: string,
  created_on: timestamp,
  coordinate: {
    lat: num,
    lng: num }]
*/
dbController.addUser = async (req, res, next) => {
  try {
    // declare a new user object with name, password, coords
  const { username, password, coordinates } = req.body;
  const encrypted = await bcrypt.hash(password, 10);
  console.log(encrypted);
  const query = `INSERT INTO users(username, password, coordinates) VALUES($1, $2, $3) RETURNING *`;
  const values = [username, encrypted, JSON.stringify(coordinates)];
    const response = await db.query(query, values);
    res.locals.user = response.rows;
    next();
  } catch (err) {
    return next(err);
  }
}


// TODO! FINISH THIS METHOD
// PUT / update a user's data
// dbController.updateUser = async (req, res, next) => {
//   const { user } = req.body;
//   const query = `SQL query`
//   const values = [];
//   try {
//     const response = await db.query(query, values);
//     res.locals.user = response;
//   } catch (err) {
//     return next(err);
//   }
// }

// get list of all users EXCEPT current user
dbController.getList = async (req, res, next) => {
  // declare a var to store our search query
  // not equal ->  <> OR !=
  const { userID } = req.body
  const query = `SELECT * FROM users WHERE users.user_id != $1`
  const values = [userID];
  try {
    // send data via res locals
    const response = await db.query(query, values);
    res.locals.users = response.rows;
    return next();
  } catch (err) {
    return next(err);
  }
}

// get friend from list
dbController.getFriend = async (req, res, next) => {
  try {

  }
  catch (err) {

  }
}

// TODOS //

// ADD / POST/GET? user to friend list
// dbController.getAllFriends = async (req, res, next) => {
//   try {

//   }
//   catch(err) {

//   }
// }

// DELETE user from friend list

// post to friends table with user1_id: current user, user2_id, selected user
// dbController.addFriends = async (req, res, next) => {
//   try {

//   }
//   catch(err) {

//   }
// }



module.exports = dbController;