const session = require('express-session');

const MongoStore = require('connect-mongo')(session);

const mongoose = require('mongoose')

module.exports = app => {

  app.use(
    session({
      secret: 'secrettest',
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
      })
    })
  );
};