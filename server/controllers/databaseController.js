const db = require('../models/model');
const bcrypt = require('bcryptjs');
const NodeGeocoder = require('node-geocoder');

const dbController = {};

const options = {
  provider: 'google',
  apiKey: 'AIzaSyAG8pD29eYb7EnZNrNFinFbmMtJiqqnzKI',
}

const geocoder = NodeGeocoder(options);
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
  const { username, password } = req.query;
  // if username / password is empty string / not a string throw error
  const query = `SELECT * FROM users WHERE users.username = $1`
  const values = [username];
  console.log('Query', req.query);
  try {
    // await query response
    const response = await db.query(query, values);
    // send error if user not found
    if (!response.rows.length) {
      res.status(404);
      res.locals.verified = false;
      res.locals.message = 'No user found!';
      res.locals.user = {};
      // res.locals.friends = [];
      // .send({
      //   verified: false,
      //   message: 'User not found!',
      //   user: {},
      // })
      return next();
    }
    const user = response.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    // send error if passwords don't match
    if (!valid) {
      res.status(401);
      res.locals.verified = false;
      res.locals.message = 'Invalid password';
      res.locals.user = {};
      res.locals.friends = [];
      // res.status(401).send({
      //   verified: false,
      //   message: 'Invalid password!',
      //   user: {},
      // })
      return next();
    }
    // send object upon successful log-in
    else {
      res.status(200);
      res.locals.verified = true;
      res.locals.message = 'User verified!';
      res.locals.user = user;
      // res.locals.friends = [];
      // res.locals.userObj = {
      //   verified: true,
      //   message: 'User verified!',
      //   user: user,
      // };
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
  const { username, password, address } = req.body;
  const geoData = await geocoder.geocode(address);
  const coordinates = {lat: geoData[0].latitude, lng: geoData[0].longitude};
  console.log(coordinates);
  if (typeof username === 'string' && typeof password === 'string') {
    const encrypted = await bcrypt.hash(password, 10);
    console.log(encrypted);
    const query = `INSERT INTO users(username, password, coordinates) VALUES($1, $2, $3) RETURNING *`;
    const values = [username, encrypted, JSON.stringify(coordinates)];
    const response = await db.query(query, values);
    const user = response.rows[0];
    // res.locals.user = response.rows;
    res.locals.userObj = {
      verified: true,
      message: 'User created!',
      user: user,
    }
    return next();
    } else {
      res.status(401).send({
        verified: false,
        message: 'Invalid username and/or password!',
        user: {},
      })
      return next();
    }
  } catch (err) {
    return next(err);
  }
}


// TODO! FINISH THIS METHOD
// PUT / update a user's data
dbController.updateUser = async (req, res, next) => {
  const { userID, newCoordinates } = req.body;
  const query = `UPDATE users SET user.coordinates = $2 WHERE user.user_id = $1`
  const values = [newCoordinates];
  try {
    const response = await db.query(query, values);
    res.locals.user = response;
  } catch (err) {
    return next(err);
  }
}

// get list of all users EXCEPT current user
dbController.getList = async (req, res, next) => {
  // declare a var to store our search query
  // not equal ->  <> OR !=
  const { username } = req.query;
  const query = `SELECT * FROM users WHERE users.username != $1`;
  const values = [username];
  try {
    // send data via res locals
    const response = await db.query(query, values);
    res.locals.friends = response.rows;
    return next();
  } catch (err) {
    return next(err);
  }
}

// get friend from list
dbController.getFriend = async (req, res, next) => {
  const { userID } = req.query;
  const query = `SELECT * FROM users WHERE users.user_id = $1`
  const values = [userID];
  try {
    const response = await db.query(query, values);
    // response.rows[0]???
    res.locals.users = response.rows;
    return next();
  }
  catch (err) {
    return next(err);
  }
}

dbController.getCoords = async (req, res, next) => {
  try {
    const {address} = req.body
    const geoData = await geocoder.geocode(address);
    const coordinates = {lat: geoData[0].latitude, lng: geoData[0].longitude};
    res.locals.coords = coordinates;
    return next();
  }
  catch(err) {
    return next(err)
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