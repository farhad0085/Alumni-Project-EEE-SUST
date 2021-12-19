import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./pages/Others/NotFound";
import HomePage from "./pages/HomePage/HomePage";


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
