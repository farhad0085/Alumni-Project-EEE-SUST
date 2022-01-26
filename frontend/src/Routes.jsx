import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./pages/Others/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import BatchListPage from "./pages/BatchListPage/BatchListPage";
import BatchPage from "./pages/BatchPage/BatchPage";


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/batches" component={BatchListPage} />
      <Route exact path="/batches/:batchId" component={BatchPage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
