import { render } from "@testing-library/react";
import React, { Component, useContext } from "react";
import { Route, Redirect } from "react-router-dom";

interface Props {
  component: any;
  exact?: boolean;
  path: string;
  roles?: string[];
  module?: string;
}

let userState;

try {
  userState = JSON.parse(localStorage.getItem("_user") || "");
} catch (error) {
  userState = undefined;
}
let user = userState ? userState.user : undefined;

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={(props: any) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default PrivateRoute;
