const db = require('../models/model');

const dbController = {};

// get / verify current user
dbController.verifyUser = async (req, res, next) => {
  const { username, reqPW } = req.body;
  // if username / password is empty string / not a string throw error
  const query = `SELECT * FROM users WHERE users.username = $1`
  const values = [username];
  try {
    // send data via res locals
    const response = await db.query(query, values);
    if (!response.rows.length) {
      // correct syntax >>>>> ????
      res.send({
        verified: false,
        message: 'User not found!'
     })
      next();
    }
    const user = response.rows[0];
    const resPW = user.password;
    if (resPW !== reqPW) {
      res.send({
        verified: false,
        message: 'Invalid password!'
      })
      next();
    } else {
      // send object, userID, location, verified: true????
      res.locals.user = user;
      return next();
    }
  } catch (err) {
    return next(err);
  }
}

// post/create a new user (encrypt password)
dbController.addUser = async (req, res, next) => {
  // declare a new user object with name, password, coords
  const { username, password, coordinates } = req.body;
  const query = `INSERT INTO users(username, password, coordinates) VALUES($1, $2, $3) RETURNING *`;
  const values = [username, password, JSON.stringify(coordinates)];
  try {
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
  catch(err) {
    
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

module.exports = databaseController;