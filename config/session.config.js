const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const MySQLStoreSession = MySQLStore(session);

const options = {
  host: '3.34.122.61',
  port: 3306,
  user: 'user',
  password: 'hypeboy',
  database: '40'
}

const sessionStore = new MySQLStoreSession(options);

function getSessionConfig() {
  return {
    secret: "추후 env 예정",
    resave: false,
    saveUninitialized: false,
    store : sessionStore,
    cookie: {
      httpOnly: true,
      maxAge:  14 * 24 * 60 * 60 * 1000,
    },
  };
}

module.exports = getSessionConfig;

