const { redirectHome } = require("utils/redirect");
const verifyLogin = require("utils/verifylogin");

const router = require("express").Router();

router.post("/", redirectHome, verifyLogin);
module.exports = router;
