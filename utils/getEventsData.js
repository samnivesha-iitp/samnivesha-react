const fetch = require("isomorphic-fetch");

const eveData = async () => {
  const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}/event`);
  const data = await response.json();
  return { eventData: data };
};
module.exports = eveData;
