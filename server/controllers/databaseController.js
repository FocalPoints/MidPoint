const db = require('../models/model');
const bcrypt = require('bcryptjs');
const NodeGeocoder = require('node-geocoder');

const dbController = {};

const options = {
  provider: 'google',
  apiKey: 'API-KEY-HERE',
}

const geocoder = NodeGeocoder(options);

// verify an existing user
/*
Expects: 
  req.query = { username: string, password: string }
Returns: 
  res.locals.verified: boolean
  res.locals. message: string
  res.locals.user: userObject

  userObject: { user_id: int, username: string, password: string, coordinates: { lat: num, lng: num } }
*/
dbController.verifyUser = async (req, res, next) => {
  const { username, password } = req.query;
  const query = `SELECT * FROM users WHERE users.username = $1`
  const values = [username];
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
Expects: 
  req.body = { username: string, password: string, address: string }
Returns: 
  res.locals.verified = boolean,
  res.locals.message = string,
  res.locals.user = userObj
*/
dbController.addUser = async (req, res, next) => {
  try {
    const { username, password, address } = req.body;
    // turns address into coordinates
    const geoData = await geocoder.geocode(address);
    const coordinates = { lat: geoData[0].latitude, lng: geoData[0].longitude };
    if (typeof username === 'string' && typeof password === 'string' && username.length && password.length) {
      // encrypt the password
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
/*
Expects: 
  req.body = { user_id, newCoordinates }
Returns: 
  res.locals.user = user;
*/
dbController.updateUser = async (req, res, next) => {
  const { user_id, newCoordinates } = req.body;
  const query = `UPDATE users SET users.coordinates = $2 WHERE users.user_id = $1`
  const values = [user_id, newCoordinates];
  try {
    const response = await db.query(query, values);
    res.locals.user = response;
    return next();
  } catch (err) {
    return next(err);
  }
}

// get list of all users on the current users friend list
/*
Expects:
  res.locals.user = { user_id: int }
Returns: 
  res.locals.friendList = [ userObj ]
*/
dbController.getFriendList = async (req, res, next) => {
  try {
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
    const response = await db.query(query, values);
    res.locals.friendList = response.rows;
    return next();
  } catch (err) {
    return next(err);
  }
}

// get list of all users NOT on current user's friends list
/*
Expects:
  res.locals.user = { user_id: int }
Returns: 
  res.locals.notFriendList = [ userObj ]
*/
dbController.getNotFriendList = async (req, res, next) => {
  try {
    const { user_id } = res.locals.user;
    const query = `
    SELECT * FROM users WHERE
    user_id != $1 AND
    user_id NOT IN (SELECT user2_id from users JOIN friends ON users.user_id = friends.user1_id
    WHERE users.user_id = $1)
  `;
    const values = [user_id];
    // send data via res locals
    const response = await db.query(query, values);
    res.locals.notFriendList = response.rows;
    return next();
  } catch (err) {
    return next(err);
  }
}

// given an address as a string return the coordinates
/*
Expects:
Returns: 
*/
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
Expects:
  req.body = { user1_id: int, user2_id: int }
Returns: 
  res.locals.insert = [userObj]
*/
dbController.addFriend = async (req, res, next) => {
  try {
    const { user1_id, user2_id } = req.body;
    res.locals.user = { user_id: user1_id };
    const values = [user1_id, user2_id];
    const query = `
      INSERT INTO friends (user1_id, user2_id) VALUES($1, $2)
      RETURNING *
    `;
    const insert = await db.query(query, values);
    res.locals.insert = insert.rows;
    return next();
  }
  catch (err) {
    return next(err);
  }
}

// TODOS //
// DELETE user from friend list

module.exports = dbController;