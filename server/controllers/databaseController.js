const db = require('../models/model');
const bcrypt = require('bcryptjs');
const NodeGeocoder = require('node-geocoder');

const dbController = {};

const options = {
  provider: 'google',
  apiKey: 'AIzaSyAisanRgGF25lhPR7TSu_VDRggQqwH5MVg',
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
      // TODO! - make this an error
      res.status(404);
      res.locals.verified = false;
      res.locals.message = 'No user found!';
      res.locals.user = {};
      return next();
    }
    const user = response.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    // send error if passwords don't match
    if (!valid) {
      // TODO! - make this an error
      res.status(401);
      res.locals.verified = false;
      res.locals.message = 'Invalid password';
      res.locals.user = {};
      res.locals.friends = [];
      return next();
    }
    // send object upon successful log-in
    else {
      res.status(200);
      res.locals.verified = true;
      res.locals.message = 'User verified!';
      res.locals.user = user;
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
    const coordinates = { lat: geoData[0].latitude, lng: geoData[0].longitude };
    if (typeof username === 'string' && typeof password === 'string') {
      const encrypted = await bcrypt.hash(password, 10);
      const query = `INSERT INTO users(username, password, coordinates) VALUES($1, $2, $3) RETURNING *`;
      const values = [username, encrypted, JSON.stringify(coordinates)];
      const response = await db.query(query, values);
      const user = response.rows[0];
      
      res.locals.verified = true;
      res.locals.message = 'User created!'
      res.locals.user = user;
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
dbController.getFriendList = async (req, res, next) => {
  // declare a var to store our search query
  // not equal ->  <> OR !=
  const { user_id } = res.locals.user;
  const query = `
    SELECT u2.user_id, u2.username, u2.coordinates 
    FROM users u1 JOIN friends 
    ON u1.user_id = friends.user1_id
    JOIN users u2
    ON u2.user_id = friends.user2_id
    WHERE u1.user_id = $1
  `;
  const values = [user_id];
  try {
    // send data via res locals
    const response = await db.query(query, values);
    res.locals.friendList = response.rows;
    return next();
  } catch (err) {
    return next(err);
  }
}

// get list of all users not on current user's friends list
dbController.getNotFriendList = async (req, res, next) => {
  // declare a var to store our search query
  // not equal ->  <> OR !=
  const { user_id } = res.locals.user;
  const query = `
    SELECT * FROM users WHERE
    user_id != $1 AND
    user_id NOT IN (SELECT user2_id from users JOIN friends ON users.user_id = friends.user1_id
    WHERE users.user_id = $1)
  `;
  const values = [user_id];
  try {
    // send data via res locals
    const response = await db.query(query, values);
    res.locals.notFriendList = response.rows;
    return next();
  } catch (err) {
    return next(err);
  }
}

// given an address as a string return the coordinates
dbController.getCoords = async (req, res, next) => {
  try {
    const { address } = req.body
    const geoData = await geocoder.geocode(address);
    const coordinates = { lat: geoData[0].latitude, lng: geoData[0].longitude };
    res.locals.coords = coordinates;
    return next();
  }
  catch (err) {
    return next(err)
  }
}

// adds a new friend to the current users friend list
/* 
expect:
req.body: { user1_id, user2_id }
*/
dbController.addFriend = async (req, res, next) => {
  try {
    const { user1_id, user2_id } = req.body;
    res.locals.user = { user_id: user1_id};
    const values = [user1_id, user2_id];
    const query = `
      INSERT INTO friends (user1_id, user2_id) VALUES($1, $2)
      RETURNING *
    `;
    const insert = await db.query(query, values);
    res.locals.insert = insert.rows;
    return next();
  }
  catch(err) {
    return next(err);
  }
}

// Adding a friend who is not a current user
// This is a direct copy of the addFriend function with the INSERT QUERY adjusted. 
dbController.addOutsideFriend = async (req, res, next) => {
  try {
    const { user2_id, username, coordinates } = req.body;
    res.locals.user = { user_id: user2_id};
    const values = [user2_id, username, coordinates];
    const query = `
      INSERT INTO outside_users (user2_id, username, coordinates) VALUES($1, $2, $3)
      RETURNING *
    `;
    const insert = await db.query(query, values);
    res.locals.insert = insert.rows;
    return next();
  }
  catch(err) {
    return next(err);
  }
}

// TODOS //
// DELETE user from friend list

// post to friends table with user1_id: current user, user2_id, selected user
// dbController.addFriends = async (req, res, next) => {
//   try {

//   }
//   catch(err) {

//   }
// }


module.exports = dbController;