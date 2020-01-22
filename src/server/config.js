export const runtimeConfig =
  typeof window == !undefined
    ? {
        // client
        email: window.env.email,
        URL: `${window.location.protocol}://${window.location.origin}`,
        ADMIN:window.env.ADMIN,
        ADMIN_PWD:window.env.ADMIN_PWD,
        ADMIN_SECRET:window.env.ADMIN_SECRET
      }
    : {
        // server
        URL: `http://${process.env.HOST}:${process.env.PORT}`,
        ADMIN:process.env.ADMIN,
        ADMIN_PWD:process.env.ADMIN_PWD,
        ADMIN_SECRET:process.env.ADMIN_SECRET
      };
