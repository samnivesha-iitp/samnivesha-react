const options = {
  user: process.env.email,
  pass: process.env.pass
};

const send = require("gmail-send")(options);

async function sendEmail(config) {
  const { sendTo, subject, html } = config;
  options.to = sendTo;
  options.subject = subject;
  options.html = html;
  try {
    await send(options);
    return true;
  } catch (err) {
    return false;
  }
}
export default sendEmail;
