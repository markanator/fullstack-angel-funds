/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const { promisify } = require('es6-promisify');

const cors = require('cors');
const helmet = require('helmet');
// local routes
const helper = require('./utils/helper');
const errorHandlers = require('./utils/errorHandlers');
const routes = require('./routes/index');

// set server up
const server = express();

// set pug views
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');
// serve files from public
server.use(express.static(path.join(__dirname, 'public')));
// cors
server.use(cors());
// server.use(helmet());
// parse request bodies
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
// for validating data
server.use(expressValidator());
// used with cookies
server.use(cookieParser());
// cookies
server.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
// passportJS to handle login
server.use(passport.initialize());
server.use(passport.session());
// pass UI message
server.use(flash());
// pass variable to tempaltes && all reqs
// pass variables to our templates + all requests
server.use((req, res, next) => {
  res.locals.h = helper;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});
// promisify some callback based APIs
server.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// Custom Routes
server.use('/', routes);

// error handling
server.use(errorHandlers.notFound);
server.use(errorHandlers.flashValidationErrors);

// development errors
if (server.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  server.use(errorHandlers.developmentErrors);
}

// else production call stack
server.use(errorHandlers.productionErrors);

// export to prevent testing errors
module.exports = server;
