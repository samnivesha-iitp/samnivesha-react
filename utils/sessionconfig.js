function session(uid, config, MongoStore, db) {
  const sessionConfig = {
    name: "sid",
    secret: uid.sync(18),
    cookie: {
      httpOnly: true,
      maxAge: 86400 * 1000,
      sameSite: true,
      secure: !config.environment
    },
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db })
  };
  return sessionConfig;
}
module.exports = session;
