// external depedencies
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import PropTypes from "prop-types";

// components
import { AuthContext, AdminContext } from "./components/authContext";
import {
  ProtectedProfile,
  ProtectedLogin,
  ProtectedSignup,
  ProtectedResetPassword,
  ProtectedAdmin,
  ProtectedAdminLogin,
} from "./components/protectedRoutes";

// css
import "./scss/bulma.scss";
import "./css/pageloader.css";

// utils
const { arrayFinder } = require("utils/findArray");
import AuthAdmin from "utils/adminApi";

const Home = loadable(() => import(/* webpackChunkName: "Home" */ "./pages/Home"));
const Admin = loadable(() => import(/* webpackChunkName: "Admin" */ "./pages/admin"));
const AdminLogin = loadable(() =>
  import(/* webpackChunkName: "AdminLogin" */ "./pages/adminLogin")
);
const Sponsors = loadable(() => import(/* webpackChunkName: "Sponsors" */ "./pages/sponsors"));
const NotFound = loadable(() => import(/* webpackChunkName: "NotFound" */ "./pages/notFound"));
const Misc = loadable(() => import(/* webpackChunkName: "Misc" */ "./pages/misc"));
const ResetPassword = loadable(() =>
  import(/* webpackChunkName: "ResetPassword" */ "./pages/resetPassword")
);
const Team = loadable(() => import(/* webpackChunkName: "Team" */ "./pages/team"));
const Blog = loadable(() => import(/* webpackChunkName: "Blog" */ "./pages/blog"));
const Contact = loadable(() => import(/* webpackChunkName: "Contact" */ "./pages/contact"));
const Login = loadable(() => import(/* webpackChunkName: "Login" */ "./pages/login"));
const Signup = loadable(() => import(/* webpackChunkName: "Signup" */ "./pages/signup"));
const Profile = loadable(() => import(/* webpackChunkName: "Profile" */ "./pages/profile"));
const Schedule = loadable(() => import(/* webpackChunkName: "Schedule" */ "./pages/schedule"));
const Forgotpassword = loadable(() =>
  import(/* webpackChunkName: "Forgotpassword" */ "./pages/forgotpassword")
);

const App = (props) => {
  const admin = new AuthAdmin();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [firstRender, setFirstrender] = useState(true);
  const { store } = props;
  useEffect(() => {
    admin
      .isLogin()
      .then((res) => {
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
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, store }}>
          <div className={`pageloader ${loader}`}></div>
          <div className={`infraloader ${loader}`}></div>
          <Switch>
            <Route exact path="/" render={() => <Home data={store} />} />
            <Route path="/contact" component={Contact} fallback={<div>loading...</div>} />
            <Route path="/blog" component={Blog} fallback={<div>loading...</div>} />
            <Route path="/misc" component={Misc} fallback={<div>loading...</div>} />
            <Route
              path="/reset/:resetToken"
              component={ResetPassword}
              fallback={<div>loading...</div>}
            />
            <ProtectedProfile path="/profile" component={Profile} data={store} />
            <ProtectedSignup path="/signup" component={Signup} fallback={<div>loading...</div>} />
            <ProtectedLogin path="/login" component={Login} fallback={<div>loading...</div>} />
            <ProtectedResetPassword path="/forgotpassword" component={Forgotpassword} />
            <Route path="/sponsors" component={Sponsors} fallback={<div>loading...</div>} />
            <Route path="/team" component={Team} fallback={<div>loading...</div>} />
            <Route path="/schedule" component={Schedule} fallback={<div>loading...</div>} />
            <ProtectedAdminLogin
              path="/admin/login"
              component={AdminLogin}
              fallback={<div>loading...</div>}
            />
            <ProtectedAdmin path="/admin" component={Admin} fallback={<div>loading...</div>} />
            <Route component={NotFound} fallback={<div>loading...</div>} />
          </Switch>
        </AuthContext.Provider>
      </AdminContext.Provider>
    </>
  );
};
App.propTypes = {
  store: PropTypes.array,
};
export default App;
