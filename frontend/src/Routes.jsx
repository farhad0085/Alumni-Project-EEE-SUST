import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./pages/Others/NotFound";
import HomePage from "./pages/HomePage/HomePage";
import BatchListPage from "./pages/BatchListPage/BatchListPage";
import BatchPage from "./pages/BatchPage/BatchPage";
import AlumniProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/AuthPages/EditProfilePage/EditProfilePage";
import LoginPage from "./pages/AuthPages/LoginPage/LoginPage";
import RegisterPage from "./pages/AuthPages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/AuthPages/ProfilePage/ProfilePage";


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/edit-profile" component={EditProfilePage} />
      <Route exact path="/batches" component={BatchListPage} />
      <Route exact path="/batches/:batchId" component={BatchPage} />
      <Route exact path="/alumnies/:registrationNumber(20[1-9]{2}3380[0-9]{2})" component={AlumniProfilePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
