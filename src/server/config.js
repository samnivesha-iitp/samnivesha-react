require("dotenv").config();

const runtimeConfig =
  typeof window == !undefined
    ? {
        // client
        email: window.env.email
      }
    : {
        // server

        email: process.env.email,
        password: process.env.pass,
        environment: process.env.NODE_ENV !== "production"
      };
module.exports = runtimeConfig;
