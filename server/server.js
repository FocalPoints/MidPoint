const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const databaseRouter = require('./routes/database');
const apiRouter = require('./routes/api');

const fetch = require('node-fetch');

// parse requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// need routers
app.use('/database', databaseRouter);

// api router
app.use('/api', apiRouter);
    

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred on line 37 of Server.js' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(err.log);
  return res.status(err.status).json(err.message);
});


// start server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});


const yelpBaseEndpoint = 'https://api.yelp.com/v3';
const BEARER_TOKEN = 'txLO3bBnTwEQyijGIc16dCPLup1BOLnVZB-Vv-tqNkfdQFdK8Q5dSZ9JUSl_XjqZxVOCof3jqaeD7oA0YqWYriXzq-Jsn7dIdlZRV7ya9stnRcDIVk-VkSCI5N2KYXYx';


module.exports = app;