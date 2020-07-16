const fetch = require("isomorphic-fetch");
const { runtimeconfig } = require("server/config");

async function getUserData(uid) {
  if (typeof window !== "undefined") {
    const response = await fetch(`${window.location.origin}/users/${uid}`);
    const data = await response.json();
    return { userData: data };
  } else {
    const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/users/${uid}`);
    const data = await response.json();
    return { userData: data };
  }
}
export default getUserData;
