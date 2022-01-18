import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./pages/Others/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import BatchListPage from "./pages/BatchListPage/BatchListPage";


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/batches" component={BatchListPage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
