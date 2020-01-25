import App from "../shared/App";
import React from "react";
import { StaticRouter, matchPath } from "react-router-dom";
import express from "express";
import { renderToString } from "react-dom/server";
import serialize from "serialize-javascript";
import { Helmet } from "react-helmet";
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const uid = require("uid-safe");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const compression = require("compression");
const helmet = require("helmet");
const csurf = require("csurf");
require("dotenv").config();
const getUserData = require("../../utils/getUserData");
const getEventsData = require("../../utils/getEventsData");

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
import userRouter from "./routes/users.routes";
import { runtimeConfig } from "./config";
const eventRouter = require("./routes/event.routes");
const mailRouter = require("./routes/mail.routes");
const loginRouter = require("./routes/login.route");
const passwordForgotRouter = require("./routes/forgot.route");
const passwordResetRouter = require("./routes/reset.route");
const config = {
  environment: process.env.NODE_ENV !== "production"
};
const sessionConfig = require("../../utils/sessionconfig")(
  uid,
  config,
  MongoStore,
  mongoose.connection
);
const server = express();
const uri = "mongodb://localhost:27017/samnivesha";
const csrfprotection = csurf({ cookie: false });
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});
db.on("error", console.error.bind(console, "MongoDB Connection Error"));
server
  .disable("x-powered-by")
  .use(compression())
  .use(helmet())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(session(sessionConfig))
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use("/bulma", express.static("node_modules/bulma"))
  .use("/users", userRouter)
  .use("/event", eventRouter)
  .use("/auth", loginRouter)
  .use("/mail", mailRouter)
  .use("/forgot", passwordForgotRouter)
  .use("/resetpassword", passwordResetRouter)
  .post("/logout", (req, res) => {
    req.session.destroy(err => {
      if (err) {
        res.json("failed");
      }
      res.json("success");
    });
  })
  .get("/*", (req, res) => {
    const context = {};
    let state = "";
    const promises = [];
    if (req.session.userId) {
      const userId = req.session.userId;
      promises.push(getUserData(userId));
    }
    promises.push(getEventsData());
    Promise.all(promises).then(data => {
      state = state.concat(JSON.stringify(data));
      const markup = renderToString(
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      );
      const helmet = Helmet.renderStatic();
      if (context.url) {
        res.redirect(context.url);
      } else {
        res.status(200).send(
          `<!doctype html>
      <html lang="" ${helmet.htmlAttributes.toString()}>
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="google-site-verification" content=${process.env.GOOGLE_VERIFICATION_LINK}>
          <link rel="stylesheet" href="/bulma/css/bulma.min.css"/>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ""
          }
          ${
            process.env.NODE_ENV === "production"
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
      </head>
      <body ${helmet.bodyAttributes.toString()}>
          <div id="root">${markup}</div>
          <script>window.__INITIAL_STATE__=${serialize(state)}</script>
          <script>window.env=${serialize(runtimeConfig)}</script>          
      </body>
  </html>`
        );
      }
    });
  });

export default server;
