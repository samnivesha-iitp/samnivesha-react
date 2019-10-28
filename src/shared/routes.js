import Home from "./home";
import Blog from "./blog";
import Login from "./login";
import Contact from "./contact";
import Schedule from "./schedule";
import About from "./about";
import Notfound from "./Notfound";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/about",
    component: About
  },
  {
    path: "/blog",
    component: Blog
  },
  {
    path: "/contact",
    component: Contact
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/schedule",
    component: Schedule
  },
  {
    path: "*",
    component: Notfound
  }
];
export default routes;
