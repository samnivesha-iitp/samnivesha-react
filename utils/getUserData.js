const fetch = require("isomorphic-fetch");

async function getUserData(uid) {
  if (typeof window !== "undefined") {
    const response = await fetch(`${window.location.origin}/users/${uid}`);
    const data = await response.json();
    return { userData: data };
  } else {
    const response = await fetch(`http://localhost:3000/users/${uid}`);
    const data = await response.json();
    return { userData: data };
  }
}
module.exports = getUserData;
