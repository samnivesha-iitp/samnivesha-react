const router = require("express").Router();
const bcrypt = require("bcryptjs");
const axios = require("axios");
const Users = require("../models/user.model");
require("dotenv").config();
const { workshopRegistration } = require("../extras/user");

router.route("/").get((req, res) => {
  Users.find({})
    .populate({ path: "events", select: "eventName" })
    .exec((err, docs) => {
      if (err) {
        res.json({ message: "Error Ocurred" });
      } else {
        res.json(docs);
      }
    });
});
router.route("/add").post((req, res) => {
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    college,
    mobileNumber,
    referralId
  } = req.body;
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
        password: hashedPassword,
        mobileNumber,
        referralId
      });
      newUser
        .save()
        .then(() => {
          const sendTo = email;
          const subject = "Thanks for registering.";
          const html = `<html>
          <head>
          <title>Thanks for registering with Samnivesha</title>
          </head>
          <body>
          <h2>Hi, ${firstName} ${lastName}</h2><br>
          <h3>Thanks for registering with Samnivesha. Please note your Samnivesha Id </h3><h1>${username}</h1> <h3>for further instructions.</h3><br>
          <br><br><br>
          <p>Team Samnivesha</p>
          </body>
          </html>`;
          axios
            .post(
              `http://${process.env.HOST}:${process.env.PORT}/mail/extended`,
              {
                sendTo,
                subject,
                html
              }
            )
            .then(response => {
              if (response.status == 200) {
                res.status(200).json("User Added");
              }
            })
            .catch(() => {
              res.status(404).json("Mail Error");
            });
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
    .populate({
      path: "events",
      select: "eventName contact timing place isgroupallowed"
    })
    .exec((err, docs) => {
      if (err) {
        res.json({ message: "Error" + err });
      } else {
        res.json(docs);
      }
    });
});
router.route("/:id/update").post(async (req, res) => {
  const { firstName, lastName, workshop } = req.body;
  try {
    const user = await Users.findById(req.params.id).exec();
    user.firstName = firstName;
    user.lastName = lastName;
    user.workshop = workshop;
    await user.save();
    res.status(200).json(true);
  } catch (err) {
    res.status(200).json(false);
  }
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
router.route("/validateuserforevent/:eventId").post((req, res) => {
  const { eventId } = req.params;
  const { username } = req.body;
  Users.find({ username: username }, function(err, response) {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      if (response.length > 0) {
        const user = response[0];
        if (user.events.indexOf(eventId) !== -1) {
          res.status(200).json({ message: false });
        } else {
          res.json({ message: true });
        }
      } else {
        res.status(200).json({ message: "not_exist" });
      }
    }
  });
});
router.route("/add/workshop").post(async (req, res) => {
  const { userId, payload } = req.body;
  await workshopRegistration(userId, payload)
    .then(response => {
      console.log(response);
      if (response === true) {
        res.json({ message: "Ok" });
      } else {
        res.json({ message: "Failed" });
      }
    })
    .catch(() => {
      res.json({ message: "Error" });
    });
});
export default router;
