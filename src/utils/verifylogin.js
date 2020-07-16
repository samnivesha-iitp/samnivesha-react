const Users = require("server/models/user.model");
const bcrypt = require("bcryptjs");

const verifyLogin = (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email: email }, "email +password", function (err, user) {
    if (err) throw err;
    if (user) {
      if (!bcrypt.compareSync(password, user.password)) {
        // res.redirect("/login");
        return res.status(401).json({ message: "Unauthorised" });
      }
      req.session.userId = user._id;
      let cipherText = user._id.toString();
      res.cookie("uid", cipherText, { maxAge: 86400000, httpOnly: false, path: "/" });
      return res.status(200).json({ message: "success" });
      // res.redirect("/profile");
    } else {
      return res.status(401).json({ message: "Unauthorised" });
    }
  });
};
module.exports = verifyLogin;
