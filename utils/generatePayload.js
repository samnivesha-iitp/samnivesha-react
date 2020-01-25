const bcryptjs = require("bcryptjs");

async function generatePayload(payload) {
  try {
    const salt = await bcryptjs.genSalt(14);
    const hash = await bcryptjs.hash(payload, salt);
    return hash;
  } catch (err) {
    console.log("Error happend while generating payload", err);
    return null;
  }
}
module.exports = generatePayload;
