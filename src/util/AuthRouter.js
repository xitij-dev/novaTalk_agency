import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthRouter = ({ path, component: Component, ...rest }) => {
  const isAuth = useSelector((state) => state.admin.isAuth);

  return isAuth ? (
    <Redirect to="/admin" />
  ) : (
    <Route path={path} component={Component} {...rest} />
  );
};

export default AuthRouter;
