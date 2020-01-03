import React, { useContext } from "react";
import AuthContext from "./authContext";
import { Route, Redirect } from "react-router-dom";

export const ProtectedProfile = props => {
  const { isAuthenticated } = useContext(AuthContext);
  const { path, component } = props;
  return isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
};

export const ProtectedLogin = props => {
  const { isAuthenticated } = useContext(AuthContext);
  const { path, component } = props;
  return !isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to={{ pathname: "/profile" }} />
  );
};
export const ProtectedSignup = props => {
  const { isAuthenticated } = useContext(AuthContext);
  const { path, component } = props;
  return !isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to={{ pathname: "/profile" }} />
  );
};
export const ProtectedResetPassword = props => {
  const { isAuthenticated } = useContext(AuthContext);
  const { path, component } = props;
  return !isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to={{ pathname: "/profile" }} />
  );
};

