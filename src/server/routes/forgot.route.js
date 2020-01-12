const router = require("express").Router();
const crypto = require("crypto");
const axios = require("axios");

const User = require("../models/user.model");

router.post("/", (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email })
    .then(user => {
      const token = crypto.randomBytes(30).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 86400 * 1000;
      user
        .save()
        .then(() => {
          const sendTo = email;
          let host;
          if (req.protocol == "https") {
            host = "samnivesha.iitp.ac.in";
          } else {
            host = req.get("Host");
          }
          const link = `${req.protocol}://${host}/reset/${token}`;
          const subject = "Password Reset link";
          const body = `Please click on this link ${link} to reset your password.`;
          axios
            .post(`http://${process.env.HOST}:${process.env.PORT}/mail`, {
              sendTo,
              subject,
              body
            })
            .then(response => {
              if (response.status == 200) {
                res.status(200).json({ message: "Reset Mail sent." });
              }
            })
            .catch(err => {
              res.status(404).json("Mail Error");
            });
        })
        .catch(() => {
          res.status(404).json({ message: "Error while saving User" });
        });
    })
    .catch(() => {
      res.status(404).json({ message: "Email not Registered." });
    });
});
module.exports = router;
