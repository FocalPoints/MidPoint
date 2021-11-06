const db = require('../models/model');

const databaseController = {};

// get list of all users EXCEPT current user
databaseController.getAllOtherUsers = async (req, res, next) => {
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

// post a new user (encrypt password)
databaseController.addUser = async (req, res, next) => {
  // declare a new user object with name, password, coords
  const { username, password, coordinates } = req.body;
  const query = `INSERT INTO users(username, password, coordinates) 
                VALUES($1, $2, $3)
                RETURNING *`;
  const values = [username, password, JSON.stringify(coordinates)];
  try {
    const response = await db.query(query, values);
    res.locals.user = response.rows;
    next();
  } catch (err) {
    return next(err);
  }
}

// verify a single user
databaseController.verifyUser = async (req, res, next) => {
  const { username, reqPW } = req.body;
  // if username / password is empty string / not a string throw error
  const query = `SELECT * FROM users WHERE users.username = $1`
  const values = [username];
  try {
    // send data via res locals
    const response = await db.query(query, values);
    if (!res.rows.length) {
      /* send back object: 
      {
        verified: false,
        message: 'No user blag blah,
      }
      */
      next(new Error('No user with that username'));
    }
    const user = response.rows[0];
    const resPW = user.password;
    if (resPW !== reqPW || !user) {
      res.locals.verified = false;
      next(new Error('Passwords don`t match!'))
    } else {

    }
    res.locals.user = response.rows;
    return next();
  } catch (err) {
    return next(err);
  }
}

// update a user
databaseController.updateUser = async (req, res, next) => {
  try {

  } catch (err) {
    
  }
}
// get a list of all friends of one user
databaseController.getAllFriends = async (req, res, next) => {
  try {
    
  }
  catch(err) {
    
  }
}
// get a pair of users and their coordinates
databaseController.getPair = async (req, res, next) => {
  try {
    
  }
  catch(err) {
    
  }
}
// post to friends table with user1_id: current user, user2_id, selected user
databaseController.addFriends = async (req, res, next) => {
  try {
    
  }
  catch(err) {
    
  }
}
module.exports = databaseController;