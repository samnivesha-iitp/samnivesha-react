const axios = require("axios");

async function getUserData(uid) {
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/users/${uid}`
      : `http://${process.env.HOST}:${process.env.PORT}/users/${uid}`;
  const response = await axios.get(url);
  return { userData: response.data };
}
export default getUserData;
