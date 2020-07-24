import React, { useContext } from "react";
import { AuthContext, AdminContext } from "./authContext";
import { Route, Redirect } from "react-router-dom";

const withProtectedRoutes = (WrappedComponent, requireLogin, restProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const isLoggedIn = requireLogin ? isAuthenticated : !isAuthenticated;
  const redirectTo = requireLogin ? "/login" : "/profile";
  return isLoggedIn ? (
    <Route
      {...restProps}
      render={(props) => {
        return <WrappedComponent {...props} {...restProps} />;
      }}
    />
  ) : (
    <Redirect to={{ pathname: redirectTo }} />
  );
};

export const ProtectedProfile = ({ component, ...restProps }) => {
  return withProtectedRoutes(component, true, restProps);
};

export const ProtectedLogin = ({ component, ...rest }) => {
  return withProtectedRoutes(component, false, rest);
};

export const ProtectedSignup = ({ component, ...rest }) => {
  return withProtectedRoutes(component, false, rest);
};

export const ProtectedResetPassword = ({ component, ...rest }) => {
  return withProtectedRoutes(component, false, rest);
};

export const ProtectedAdmin = (props) => {
  const { isAdmin } = useContext(AdminContext);
  return isAdmin ? <Route {...props} /> : <Redirect to="/admin/login" />;
};

export const ProtectedAdminLogin = (props) => {
  const { isAdmin } = useContext(AdminContext);
  return isAdmin ? <Redirect to={{ pathname: "/admin" }} /> : <Route {...props} />;
};
