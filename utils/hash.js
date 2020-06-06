import generatePayload from "./generatePayload";
require("dotenv").config();

const hash = () => {
  (async () => {
    await generatePayload(
      JSON.stringify({
        username: process.env.ADMIN,
        pwd: process.env.ADMIN_PWD,
        secret: process.env.ADMIN_SECRET,
      })
    );
  })();
};
module.exports = hash;
