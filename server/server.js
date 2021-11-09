const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const databaseRouter = require('./routes/database');

// parse requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// need routers
app.use('/database', databaseRouter);

// serve static HTML

// global error handler
app.use((err, req, res, next) => {
  // const defaultErr = {
  //   log: 'Express error handler caught unknown middleware error',
  //   status: 500,
  //   message: { err: 'An error occurred on line 37 of Server.js' },
  // };
  // const errorObj = Object.assign({}, defaultErr, err);
  console.log(err.log);
  return res.status(err.status).json(err.message);
});


// start server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});

module.exports = app;