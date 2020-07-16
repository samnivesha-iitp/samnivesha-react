const router = require("express").Router();
import sendMail from "utils/sendmail";
import sendEmail from "utils/sendHTML";

router.post("/", async (req, res) => {
  try {
    const response = await sendMail(req.body);
    response === true ? res.status(200).json(true) : res.status(200).json(false);
  } catch (err) {
    res.status(200).json(false);
  }
});
router.post("/extended", async (req, res) => {
  try {
    const response = await sendEmail(req.body);
    response === true ? res.status(200).json(true) : res.status(200).json(false);
  } catch (err) {
    res.status(200).json(false);
  }
});
export default router;
