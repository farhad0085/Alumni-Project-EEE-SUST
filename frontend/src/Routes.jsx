import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "./pages/Others/NotFound";
import AlumniList from "./pages/AlumniList/AlumniList";


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={AlumniList} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
