/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

require('dotenv').config();
// connect to database

// import models

// enable server
const server = require('./app');

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on  http://localhost:${PORT} ===\n`);
});
