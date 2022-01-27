import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./pages/Others/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import BatchListPage from "./pages/BatchListPage/BatchListPage";
import BatchPage from "./pages/BatchPage/BatchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/batches" component={BatchListPage} />
      <Route exact path="/batches/:batchId" component={BatchPage} />
      <Route exact path="/alumnies/:registrationNumber(20[1-9]{2}3380[0-9]{2})" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
