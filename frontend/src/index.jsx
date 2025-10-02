import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminIndex from "views/Index";
import Login from "views/examples/Login";
import Register from "views/examples/Register";
import HomePage from "views/HomePage";
import AlumniPage from "views/AlumniPage";
import NoticePage from "views/NoticePage";
import EventPage from "views/EventsPage";
import FacultyPage from "views/FacultyPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/alumni" component={AlumniPage} />
      <Route exact path="/notices" component={NoticePage} />
      <Route exact path="/events" component={EventPage} />
      <Route exact path="/faculty-staffs" component={FacultyPage} />
      <Route exact path="/admin" component={AdminIndex} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={Register} />
    </Switch>
  </BrowserRouter>
);
