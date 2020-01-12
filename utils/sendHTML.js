const options = {
  user: process.env.email,
  pass: process.env.pass
};

const send = require("gmail-send")(options);

function sendEmail(req, res, next) {
  const { sendTo, subject, html } = req.body;
  options.to = sendTo;
  options.subject = subject;
  options.html = html;
  send(options, (err, response, full) => {
    if (err) {
      res.json({ err: err });
    }
    if (response) {
      res.status(200).json({ status: "success" });
    }
  });
}
module.exports = sendEmail;
