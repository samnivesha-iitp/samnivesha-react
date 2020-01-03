const path = require("path");
module.exports = {
  modify(config, { target, dev }, webpack) {
    const appConfig = config;
    if (target === "node" && !dev) {
      const serverEntry = path.resolve(__dirname, "src", "server");
      appConfig.entry[0] = serverEntry;
    }
    if (target == "web" && !dev) {
      const webEntry = path.resolve(__dirname, "src", "web", "client");
      appConfig.entry.client = webEntry;
    }
    if (target === "node" && dev) {
      const serverEntry = path.resolve(__dirname, "src", "server");
      appConfig.entry[2] = serverEntry;
    }
    if (target == "web" && dev) {
      const webEntry = path.resolve(__dirname, "src", "web", "client");
      appConfig.entry.client[1] = webEntry;
    }

    return appConfig;
  }
};
