function session(uid, MongoStore, db) {
  const sessionConfig = {
    name: "sid",
    secret: uid.sync(18),
    cookie: {
      maxAge: 86400 * 1000 * 30,
    },
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
  };
  return sessionConfig;
}
module.exports = session;
