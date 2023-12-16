function getSessionConfig() {
  return {
    secret: "추후 env 예정",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 1000,
    },
  };
}

module.exports = getSessionConfig;
