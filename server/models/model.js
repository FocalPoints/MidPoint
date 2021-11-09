const { Pool } = require('pg');

const PG_URI = 'postgres://kceatlpb:Koo2_GqtOmfXMPfsXJiC2fvGZhP1cp9C@fanny.db.elephantsql.com/kceatlpb'

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

/* 
get the username, and the friends name
from every column where the user_id is in column 1
OR the user_id is in column 2
*/

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};