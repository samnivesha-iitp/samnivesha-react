import express from "express";
import config from "./config";
import React from "react";
import routes from "../shared/routes";
import { renderToString } from "react-dom/server";
import App from "../shared/App";
import { matchPath,StaticRouter } from "react-router-dom";

const app = express();

app.use(express.static("public"));
app.use("/css", express.static("node_modules/bulma/css/"));
// app.use(router);

app.set("view engine", "ejs");

app.get("*", (req, res) => {
  const activeRoutes =
    routes.find(route => {
      matchPath(req.url, route);
    }) || {};

  const initialMarkup = renderToString(
    <StaticRouter>
      <App />
    </StaticRouter>
  );

  res.render("index", { initialMarkup });
});

app.listen(config.port, () =>
  console.log(`Server is Running on PORT ${config.port} ....`)
);
