const router = require("express").Router();

const Users = require("../../models/user.model");

router.route("/verifyuser").get((req, res) => {
  return res.json("Verify user page");
});
module.exports = router;
