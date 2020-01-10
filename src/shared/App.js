import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./index";
import About from "./about";
import Contact from "./contact";
import Events from "./events";
import Blog from "./blog";
import Profile from "./profile";
import Login from "./login";
import Signup from "./signup";
import Workshop from "./workshop";
import Sponsors from "./sponsors";
import Header from "./components/header";
import Cookies from "js-cookie";
import Forgotpassword from "./forgotpassword";
import Helmet from "react-helmet";

import AuthContext from "./components/authContext";
import {
  ProtectedProfile,
  ProtectedLogin,
  ProtectedSignup,
  ProtectedResetPassword
} from "./components/protected.routes";

const App = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [firstRender, setFirstrender] = useState(true);
  const { store } = props;
  useEffect(() => {
    function runAtFirstRender() {
      if (store.length > 1) {
        // User is already logged in
        if (store[0].userData == !"undefined" && Cookies.get("uid") !== "") {
          setIsAuthenticated(true);
          setUser(store[0].userData);
        } else {
          setIsAuthenticated(true);
          setUser(store[0].userData);
        }
      }
      function delayloader() {
        setFirstrender(false);
        clearTimeout(delayloader);
      }
      setTimeout(delayloader, 3000);
    }
    if (firstRender) {
      runAtFirstRender();
    }
  });
  const loader = firstRender ? "is-active" : "";
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
          <Helmet>
            <link rel="stylesheet" href="/css/index/pageloader.css" />
          </Helmet>
          <div className={`pageloader ${loader}`}></div>
          <div className={`infraloader ${loader}`}></div>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Home name={props.store} />} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/events" component={Events} />
        {/* <Route path="/blog" component={Blog} /> */}
        <ProtectedProfile path="/profile" component={Profile} />
        <ProtectedSignup path="/signup" component={Signup} />
        <ProtectedLogin path="/login" component={Login} />
        <ProtectedResetPassword
          path="/forgotpassword"
          component={Forgotpassword}
        />
        <Route path="/workshop" component={Workshop} />
        <Route path="/sponsors" component={Sponsors} />
      </Switch>
    </AuthContext.Provider>
  );
};

export default App;
