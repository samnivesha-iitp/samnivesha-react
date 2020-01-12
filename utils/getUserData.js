const fetch = require("isomorphic-fetch");
const { runtimeconfig } = require("../src/server/config");

async function getUserData(uid) {
  if (typeof window !== "undefined") {
    const response = await fetch(`${window.location.origin}/users/${uid}`);
    const data = await response.json();
    return { userData: data };
  } else {
    const response = await fetch(
      `http://${process.env.HOST}:${process.env.PORT}/users/${uid}`
    );
    const data = await response.json();
    return { userData: data };
  }
  // const response = await fetch(`${runtimeconfig.URL}/users/${uid}`);
  // const data = await response.json();
  // return { userData: data };
}
module.exports = getUserData;
