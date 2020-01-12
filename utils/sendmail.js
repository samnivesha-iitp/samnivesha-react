const options = {
  user: process.env.email,
  pass: process.env.pass
};

const send = require("gmail-send")(options);

function sendMail(req, res, next) {
  const { sendTo, subject, body } = req.body;
  options.to = sendTo;
  options.subject = subject;
  options.text = body;

  send(options, (err, response, full) => {
    if (err) {
      res.json({ err: err });
    }
    if (response) {
      res.status(200).json({ status: "success" });
    }
  });
}

module.exports = sendMail;
