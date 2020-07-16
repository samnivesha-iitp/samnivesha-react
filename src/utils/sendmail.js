const options = {
  user: process.env.email,
  pass: process.env.pass,
};

const send = require("gmail-send")(options);

async function sendMail(config) {
  const { sendTo, subject, body } = config;
  options.to = sendTo;
  options.subject = subject;
  options.text = body;
  try {
    await send(options);
    return true;
  } catch (err) {
    return false;
  }
}

export default sendMail;
