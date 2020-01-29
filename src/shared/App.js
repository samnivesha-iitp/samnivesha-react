import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./index";
import Profile from "./profile";
import Cookies from "js-cookie";
import Helmet from "react-helmet";
const arrayFinder = require("../../utils/findArray");
import { AuthContext, AdminContext } from "./components/authContext";
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
import loadable from "@loadable/component";
import Forgotpassword from './forgotpassword'

const Sponsors = loadable(() => import("./sponsors"));
const NotFound = loadable(() => import("./notFound"));
const Misc = loadable(() => import("./misc"));
const ResetPassword = loadable(() => import("./resetPassword"));
const Team = loadable(() => import("./team"));
const Blog = loadable(() => import("./blog"));
const Contact = loadable(() => import("./contact"));
const Login = loadable(() => import("./login"));
const Signup = loadable(() => import("./signup"));

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
      <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
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
            <Route
              path="/contact"
              component={Contact}
              fallback={<div>loading...</div>}
            />
            <Route
              path="/blog"
              component={Blog}
              fallback={<div>loading...</div>}
            />
            <Route
              path="/misc"
              component={Misc}
              fallback={<div>loading...</div>}
            />
            <Route
              path="/reset/:resetToken"
              component={ResetPassword}
              fallback={<div>loading...</div>}
            />
            <ProtectedProfile
              path="/profile"
              component={Profile}
              data={store}
            />
            <ProtectedSignup
              path="/signup"
              component={Signup}
              fallback={<div>loading...</div>}
            />
            <ProtectedLogin
              path="/login"
              component={Login}
              fallback={<div>loading...</div>}
            />
            <ProtectedResetPassword
              path="/forgotpassword"
              component={Forgotpassword}
            />
            <Route
              path="/sponsors"
              component={Sponsors}
              fallback={<div>loading...</div>}
            />
            <Route
              path="/team"
              component={Team}
              fallback={<div>loading...</div>}
            />
            <ProtectedAdminLogin path="/admin/login" component={AdminLogin} />
            <ProtectedAdmin path="/admin" component={Admin} />
            <Route component={NotFound} fallback={<div>loading...</div>} />
          </Switch>
        </AuthContext.Provider>
      </AdminContext.Provider>
    </>
  );
};
App.propTypes = {};
export default App;
