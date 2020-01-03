const fetch = require("isomorphic-fetch");

const eveData = async () => {
  const response = await fetch(`http://localhost:3000/event`);
  const data = await response.json();
  return { eventData: data };
};
module.exports = eveData;
