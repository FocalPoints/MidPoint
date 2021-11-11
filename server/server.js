const axios = require('axios');
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

//takes in google places api call here, must be done on backend because cors
app.post('/nearbysearch', async (req, res) => {
  try {
    const {lat, lng, radius, type} = req.body;
    //example google gave in docs
    const {data} = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${radius}&type=${type}&key=AIzaSyD3ffU-AJuJVW1AB3do_AOV2hi1mwYavTU`);
    console.log('we got places data!!!', data);
    res.send(data); //can put this in action.payload, filter or process
  } catch (err) {
    console.log('still cant get data from google places :(', err);
  }
});

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