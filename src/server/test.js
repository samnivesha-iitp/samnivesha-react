const axios = require("axios");
const sendTo = "aman29271@gmail.com";
const link = `reset/abc`;
const subject = "Password Reset link";
const body = `Please click on this link ${link} to reset your password.`;
axios
  .post("http://localhost:3000/mail", { sendTo, subject, body })
  .then(response => {
    if (response.status == 200) {
      // res.send(200).json({ message: "Reset Mail sent." });
      console.log("Reset Mail sent.");
    }
  })
  .catch((err) => {
    // res.status(404).json({ message: "Mail Error" });
    console.log(err.toJSON().code);
  });
