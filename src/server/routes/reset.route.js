const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

router.route("/").post((req, res) => {
  const { resetToken } = req.query;
  const { newPass } = req.body;
  User.find({ resetPasswordToken: resetToken }, function (err, response) {
    if (err) {
      res.status(500).json({ message: "Error while accessing Database" + err });
    } else {
      if (response.length !== 0) {
        const user = response[0];
        if (user.resetPasswordExpires > Date.now()) {
          const salt_round = 12;
          bcrypt.hash(newPass, salt_round).then((hashedPassword) => {
            user.password = hashedPassword;
            user.resetPasswordExpires = null;
            user.resetPasswordToken = null;
            user
              .save()
              .then(() => {
                res.status(200).json({ message: "Password has been reset." });
              })
              .catch((err) => {
                res.status(500).json({ message: "Error while reseting password" + err });
              });
          });
        } else {
          res.status(401).json({ message: "Token expired" });
        }
      } else {
        res.status(401).json({ messge: "An Invalid Token Found" });
      }
    }
  });
});
router.route("/wt/:userId").post((req, res) => {
  const { newPass } = req.body;
  const { userId } = req.params;
  User.find({ _id: userId }, function (err, response) {
    if (err) {
      res.status(500).json({ message: "Error while accessing Database" + err });
    } else {
      const user = response[0];
      const salt_round = 12;
      bcrypt
        .hash(newPass, salt_round)
        .then((hashedPassword) => {
          user.password = hashedPassword;
          user
            .save()
            .then(() => {
              res.status(200).json({ message: "Password has been reset." });
            })
            .catch(() => {
              res.status(500).json({ message: "Error while reseting password" + err });
            });
        })
        .catch(() => {
          res.status(503).json({ message: "Password Hashing Failed." });
        });
    }
  });
});
module.exports = router;
