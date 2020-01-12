export const runtimeConfig =
  typeof window == !undefined
    ? {
        // client
        email: window.env.email,
        URL: `${window.location.protocol}://${window.location.origin}`
      }
    : {
        // server

        email: process.env.email,
        password: process.env.pass,
        URL: `http://${process.env.HOST}:${process.env.PORT}`,
        environment: process.env.NODE_ENV !== "production"
      };
