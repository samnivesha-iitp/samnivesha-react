const fetch = require("isomorphic-fetch");

async function getUserData(uid) {
  const response = await fetch(`http://localhost:3000/users/${uid}`);
  const data = await response.json();

  return { userData: data };
}
module.exports = getUserData;
