import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminIndex from "pages/Index";
import Login from "pages/examples/Login";
import Register from "pages/examples/Register";
import HomePage from "pages/HomePage";
import AlumniPage from "pages/AlumniPage";
import NoticePage from "pages/NoticePage";
import EventPage from "pages/EventsPage";
import FacultyPage from "pages/faculty/FacultyPage";
import FacultyProfilePage from "pages/faculty/FacultyProfilePage";
import LabsProjectsPage from "pages/projects/LabsProjectsPage";
import LabsProjectsDetailPage from "pages/projects/LabsProjectsDetailPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/alumni" component={AlumniPage} />
      <Route exact path="/notices" component={NoticePage} />
      <Route exact path="/events" component={EventPage} />
      <Route exact path="/faculty-staffs" component={FacultyPage} />
      <Route exact path="/faculty-profile/:id" component={FacultyProfilePage} />
      <Route exact path="/labs-projects" component={LabsProjectsPage} />
      <Route exact path="/labs-projects/:type(lab|project)/:id" component={LabsProjectsDetailPage} />
      <Route exact path="/admin" component={AdminIndex} />
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={Register} />
    </Switch>
  </BrowserRouter>
);
