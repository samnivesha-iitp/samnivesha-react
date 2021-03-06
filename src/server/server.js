import App from "../shared/App";
import React from "react";
import { StaticRouter } from "react-router-dom";
import express from "express";
import { renderToString } from "react-dom/server";
import serialize from "serialize-javascript";
import { Helmet } from "react-helmet";
import mongoose from "mongoose";
import uid from "uid-safe";
import session from "express-session";
import compression from "compression";
import helmet from "helmet";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { html as htmlTemplate, oneLineTrim } from "common-tags";
const MongoStore = require("connect-mongo")(session);
require("dotenv").config();
import path from "path";

// utils
import getUserData from "utils/getUserData";
import getEventsData from "utils/getEventsData";
import connectDB from "./extras/connect";
// routers
import adminRouter from "./routes/admin.route";
import userRouter from "./routes/users.route";
import eventRouter from "./routes/event.route";
import mailRouter from "./routes/mail.route";
import loginRouter from "./routes/login.route";
import passwordForgotRouter from "./routes/forgot.route";
import passwordResetRouter from "./routes/reset.route";
//logger
const logger = require("./routes/requestLogger");
//config
import { runtimeConfig } from "./config";

const sessionConfig = require("utils/sessionconfig")(uid, MongoStore, mongoose.connection);
connectDB;
const server = express();
server
  .disable("x-powered-by")
  .use(logger)
  .use(compression())
  .use(helmet())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(session(sessionConfig))
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use("/users", userRouter)
  .use("/admin", adminRouter)
  .use("/event", eventRouter)
  .use("/auth", loginRouter)
  .use("/mail", mailRouter)
  .use("/forgot", passwordForgotRouter)
  .use("/resetpassword", passwordResetRouter)
  .post("/logout", (req, res) => {
    req.session.destroy((err) => {
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
    Promise.all(promises).then((data) => {
      state = state.concat(JSON.stringify(data));
      const extractor = new ChunkExtractor({
        statsFile: path.resolve("build/loadable-stats.json"),
        entrypoints: ["client"],
      });
      const markup = renderToString(
        <ChunkExtractorManager extractor={extractor}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </ChunkExtractorManager>
      );
      const helmet = Helmet.renderStatic();
      if (context.url) {
        res.redirect(context.url);
      } else {
        res.status(200).send(
          oneLineTrim(htmlTemplate`
          <!doctype html>
      <html lang="" ${helmet.htmlAttributes.toString()}>
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <meta name="description" content="Samnivesha is the annual Technical fest of the Department of Civil and Environmental Engineering (DCEE) at IIT Patna.">
          <meta name="author" content="Samnivesha '19">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="google-site-verification" content=${process.env.GOOGLE_VERIFICATION_LINK}>
          <link rel="icon" href="/favicon.ico">
          <meta property="og:image" content="/favicon.ico">
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png">
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png">
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png">
          <link href="/css/index/pageloader.css" rel="stylesheet">
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          ${extractor.getLinkTags()}
          ${extractor.getStyleTags()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
      <div class="pageloader is-active"></div>
      <div class="infraloader is-active"></div>
          <div id="root" >${markup}</div>
          <script>
          window.addEventListener('load',function(){
            document.querySelector('.pageloader').classList.remove('is-active');
            document.querySelector('.infraloader').classList.remove('is-active');
          })
          </script>
          <script>window.__INITIAL_STATE__=${serialize(state)}</script>
          <script>window.env=${serialize(runtimeConfig)}</script>
          ${extractor.getScriptTags()}          
      </body>
  </html>`)
        );
      }
    });
  });

export default server;
