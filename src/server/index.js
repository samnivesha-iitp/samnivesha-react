import http from "http";

let app = require("./server").default;

const server = http.createServer(app);

let currentApp = app;
let PORT = process.env.PORT || 3000;
server.listen(PORT, backlog);

if (module.hot) {
  console.log("✅  Server-side HMR Enabled!");

  module.hot.accept("./server", () => {
    console.log("🔁  HMR Reloading `./server`...");

    try {
      app = require("./server").default;
      server.removeListener("request", currentApp);
      server.on("request", app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  });
}

process.on("uncaughtException", (error) => {
  server.removeAllListeners("listening");
  server.close(() => {
    console.log("[Logger]: Server is shutting down due to unhandled error");
    console.log("ERROR: ", error);
  });
  process.exit(1);
});

function backlog(error) {
  if (error) {
    console.log(error);
  }

  console.log("🚀 started");
}
