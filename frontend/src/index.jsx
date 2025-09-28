import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminIndex from "views/Index";
import Login from "views/examples/Login";
import Register from "views/examples/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={AdminIndex} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/register" component={Register} />
    </Switch>
  </BrowserRouter>
);
