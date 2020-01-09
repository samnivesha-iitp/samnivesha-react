const router = require("express").Router();
const sendMail = require("../../../utils/sendmail");
const sendEmail = require('../../../utils/sendHTML')

router.post('/', sendMail);
router.post('/extended',sendEmail)
module.exports = router;
