import generatePayload from "../../utils/generatePayload";
export const runtimeConfig =
  typeof window == !undefined
    ? {
        // client
        URL: `${window.location.protocol}://${window.location.origin}`,
        PAYLOAD: window.env.payload,
      }
    : // server
      generatePayload(
        JSON.stringify({
          username: process.env.ADMIN,
          pwd: process.env.ADMIN_PWD,
          secret: process.env.ADMIN_SECRET,
        })
      ).then((hash) => {
        return {
          PAYLOAD: hash,
          URL: `http://${process.env.HOST}:${process.env.PORT}`,
        };
      });
