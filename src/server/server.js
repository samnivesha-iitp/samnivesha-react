import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../components/App";
import config from './config'

const app = express();
app.use(express.static("public"));
app.use('/css',express.static('node_modules/bulma/css/'));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const initialMarkup = ReactDOMServer.renderToString(<App />);

  res.render("index", { initialMarkup });
});

app.listen(config.port, () => console.log(`Server is Running on PORT ${config.port} ....`));
