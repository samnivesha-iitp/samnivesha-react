const fetch = require("isomorphic-fetch");

async function getUserData(uid) {
  const response = await fetch(`${window.location.origin}/users/${uid}`);
  const data = await response.json();

  return { userData: data };
}
module.exports = getUserData;
