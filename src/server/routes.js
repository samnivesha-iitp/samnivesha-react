import React from "react";
import { renderToString } from "react-dom/server";
var router = require("express").Router();
import Home from "../shared/home";
import Blog from "../shared/blog";
import About from "../shared/blog";
import Contact from "../shared/contact";
import Schedule from "../shared/schedule";
import Login from "../shared/login";

router.get("/", (req, res) => {
  const initialMarkup = renderToString(<Home />);
  res.render("index", { initialMarkup });
});
router.get("/blog", (req, res) => {
  const initialMarkup = renderToString(<Blog />);
  res.render("index", { initialMarkup });
});
router.get("/about", (req, res) => {
  const initialMarkup = renderToString(<About />);
  res.render("index", { initialMarkup });
});
router.get("/contact", (req, res) => {
  const initialMarkup = renderToString(<Contact />);
  res.render("index", { initialMarkup });
});
router.get("/schedule", (req, res) => {
  const initialMarkup = renderToString(<Schedule />);
  res.render("index", { initialMarkup });
});
router.get("/login", (req, res) => {
  const initialMarkup = renderToString(<Login />);
  res.render("index", { initialMarkup });
});

export default router;
