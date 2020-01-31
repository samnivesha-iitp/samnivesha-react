import { useEffect } from "react";
import Users from "../models/user.model";
const router = require("express").Router();
const MongoClient = require("mongodb").MongoClient;
var db = "samnivesha";
MongoClient.connect(
  "mongodb://localhost:27017?useUnifiedTopology=true",
  function(err, client) {
    if (err) throw err;
    db = client.db(db);
  }
);
router.route("/user/add").post(async (req, res) => {
  const { firstName, lastName, college, username, mobileNumber } = req.body;
  try {
    await db.collection("users").insertOne({
      firstName,
      lastName,
      college,
      mobileNumber,
      username
    });
    res.status(200).json(true);
  } catch (err) {
    console.log(err);
    return res.status(200).json(false);
  }
});
router.route("/user/find").get(async (req, res) => {
  const { username } = req.query;
  try {
    const user = await Users.findOne({ username: username })
      .populate({ path: "events", select: "eventName" })
      .exec();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(200).json("Error occured.");
  }
});
router.route("/user/:username/delete").delete(async (req, res) => {
  const { username } = req.params;
  try {
    await Users.deleteOne({ username: username }).exec();
    res.status(200).json(true);
  } catch (err) {
    res.status(200).json(false);
  }
});
router.route("/user/update/payment").post(async (req, res) => {
  const { userId, haspaid } = req.body;
  try {
    const user = await Users.findOne({ _id: userId }).exec();
    user.haspaid = haspaid;
    await user.save();
    res.status(200).json(true);
  } catch (err) {
    res.status(200).json(false);
  }
});
router.route("/workshop").post(async (req, res) => {
  const { workshop } = req.query;
  try {
    const users = await Users.find({ workshop: workshop });
    res.status(200).json(users);
  } catch (err) {
    res.status(200).json(false)
  }
});
export default router;
