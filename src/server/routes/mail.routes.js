const router = require("express").Router();
const sendMail = require("../../../utils/sendmail");

router.post('/', sendMail);
module.exports = router;
