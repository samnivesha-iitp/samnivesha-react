const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../models/user.model");

router.route("/").get((req, res) => {
  Users.find({})
    .populate({path:'events',select:'eventName contact timing place '})
    .exec((err, docs) => {
      if (err) {
        res.json({ message: "Error Ocurred" });
      } else {
        res.json(docs);
      }
    });
});
router.route("/add").post((req, res) => {
  const { username, firstName, lastName, email, password, college } = req.body;
  const BCRYPT_SALT_ROUND = 12;

  bcrypt
    .hash(password, BCRYPT_SALT_ROUND)
    .then(function(hashedPassword) {
      const newUser = new Users({
        username,
        firstName,
        lastName,
        email,
        college,
        password: hashedPassword
      });
      newUser
        .save()
        .then(() => {
          res.json("User Added");
        })
        .catch(err => {
          res.status(400).json("Error" + err);
        });
    })
    .catch(err => {
      console.log("Error saving User...", err);
      next();
    });
});
router.route("/:id").get((req, res) => {
  Users.findById(req.params.id)
    .populate({path:'events',select:'eventName contact timing place'})
    .exec((err, docs) => {
      if (err) {
        res.json({ message: "Error" + err });
      } else {
        res.json(docs);
      }
    });
});
router.route("/findByUsername").post((req, res) => {
  const { username } = req.body;
  Users.findOne({ username: username }, function(err, user) {
    if (err) throw err;
    if (user) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});
router.route("/findByEmail").post((req, res) => {
  const { email } = req.body;
  Users.findOne({ email: email }, function(err, user) {
    if (err) throw err;
    if (user) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});
module.exports = router;
