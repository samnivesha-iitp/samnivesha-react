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
import Cookies from "js-cookie";
import Forgotpassword from "./forgotpassword";
import Helmet from "react-helmet";
const arrayFinder = require("../../utils/findArray");
import { AuthContext, AdminContext } from "./components/authContext";
import ResetPassword from "./resetPassword";
import {
  ProtectedProfile,
  ProtectedLogin,
  ProtectedSignup,
  ProtectedResetPassword,
  ProtectedAdmin,
  ProtectedAdminLogin
} from "./components/protected.routes";
import Admin from "./admin";
import AdminLogin from "./adminLogin";
import AuthAdmin from "../../utils/adminApi";

const App = props => {
  const admin = new AuthAdmin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [firstRender, setFirstrender] = useState(true);
  const { store } = props;
  useEffect(() => {
    admin
      .isLogin()
      .then(res => {
        setIsAdmin(res);
      })
      .catch(() => {});
    // setIsAdmin(admin.isLogin())
    const data = arrayFinder("userData", store);
    if (typeof data !== "undefined") {
      setIsAuthenticated(true);
      setUser(data.userData);
    }
    const timer = setTimeout(() => {
      setFirstrender(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const loader = firstRender ? "is-active" : "";
  return (
    <>
      <AuthContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, user, setUser, store }}
      >
        <Helmet>
          <link rel="stylesheet" href="/css/index/pageloader.css" />
        </Helmet>
        <div className={`pageloader ${loader}`}></div>
        <div className={`infraloader ${loader}`}></div>
        <Switch>
          <Route exact path="/" render={() => <Home data={store} />} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/events" component={Events} />
          <Route path="/blog" component={Blog} />
          <Route path="/reset/:resetToken" component={ResetPassword} />
          <ProtectedProfile path="/profile" component={Profile} data={store} />
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
      <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
        <Switch>
          <ProtectedAdminLogin path="/admin/login" component={AdminLogin} />
          <ProtectedAdmin path="/admin" component={Admin} />
        </Switch>
      </AdminContext.Provider>
    </>
  );
};
App.propTypes = {};
export default App;
