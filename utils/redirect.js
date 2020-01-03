const redirectLogin = (req, res, next) => {
  if (!req.session.userId) return res.redirect("/login");
  next();
};
const redirectHome = (req, res, next) => {
  if (req.session.userId) return res.redirect("/profile");
  next();
};

module.exports = { redirectLogin, redirectHome };
