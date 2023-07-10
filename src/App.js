import React, { Fragment, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";

//bounce loader
import { BounceLoader } from "react-spinners";

import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";

import AuthRoute from "./util/AuthRouter";
import PrivateRoute from "./util/PrivateRouter";
import Admin from "./pages/Admin";

import { SET_ADMIN, UNSET_ADMIN } from "./store/admin/types";

import { IdleTimeoutManager } from "idle-timer-manager";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch({ type: SET_ADMIN, payload: token });
  }, [token, dispatch]);

  useEffect(() => {
    const manager = new IdleTimeoutManager({
      timeout: 1800, //expired after 1800 secs (30 min)
      onExpired: (time) => {
        dispatch({ type: UNSET_ADMIN });
        return <Redirect to="/login" />;
      },
    });

    return () => {
      manager.clear();
    };
  }, []);
  return (
    <Suspense
      fallback={
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <BounceLoader
            css={`
              margin: auto;
            `}
            size={60}
            color="#3d4977"
          />
        </div>
      }
    >
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/admin" component={Admin} />
          <AuthRoute exact path="/" component={Login} />
          <AuthRoute exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
