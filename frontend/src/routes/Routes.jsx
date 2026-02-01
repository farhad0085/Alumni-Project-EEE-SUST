import React from "react";
import * as URLS from "./urls";
import GuestRoute from "./GuestRoute";
import { Route, Switch } from "react-router-dom";
import withSuspense from "../utils/withSuspense";
import PrivateRoute from "./PrivateRoute";


const Home = React.lazy(() => import("../pages/Home"));
const NoticeBoard = React.lazy(() => import("../pages/Notice/NoticeBoard"));
const StudyMaterials = React.lazy(() => import("../pages/StudyMaterials"));
const FacultyStaff = React.lazy(() => import("../pages/Faculty/FacultyStaff"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const EventPage = React.lazy(() => import("../pages/Event/EventPage"));
const EventDetailPage = React.lazy(() => import("../pages/Event/EventDetailPage"));
const FacultyProfilePage = React.lazy(() => import("../pages/Faculty/FacultyProfilePage"));
const LabsProjectsPage = React.lazy(() => import("../pages/Projects/LabsProjectsPage"));
const LabsProjectsDetailPage = React.lazy(() => import("../pages/Projects/LabsProjectsDetailPage"));
const AlumniPage = React.lazy(() => import("../pages/Alumni/AlumniPage"));
const AlumniProfilePage = React.lazy(() => import("../pages/Alumni/AlumniProfilePage"));
const BatchAlumniPage = React.lazy(() => import("../pages/Alumni/BatchAlumniPage"));
const LoginPage = React.lazy(() => import("../pages/AuthPages/LoginPage/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/AuthPages/RegisterPage/RegisterPage"));
const LogoutPage = React.lazy(() => import("../pages/AuthPages/LogoutPage/LogoutConfirmation"));
const DashboardPage = React.lazy(() => import("../pages/Dashboard/Dashboard"));


const Routes = () => {

  return (
    <Switch>
      {/* Regular Pages */}
      <Route exact path="/" component={withSuspense(Home)} />
      <Route exact path="/alumni" component={withSuspense(AlumniPage)} />
      <Route exact path="/alumni/:id" component={withSuspense(AlumniProfilePage)} />
      <Route exact path="/batches/:session" component={withSuspense(BatchAlumniPage)} />

      <Route exact path="/notice-board" component={withSuspense(NoticeBoard)} />
      <Route exact path="/study-materials" component={withSuspense(StudyMaterials)} />
      <Route exact path="/labs-projects" component={withSuspense(LabsProjectsPage)} />
      <Route exact path="/labs-projects/:type(lab|project)/:id" component={withSuspense(LabsProjectsDetailPage)} />
      <Route exact path="/events" component={withSuspense(EventPage)} />
      <Route exact path="/events/:id" component={withSuspense(EventDetailPage)} />
      <Route exact path="/faculty-staff" component={withSuspense(FacultyStaff)} />
      <Route exact path="/faculty-profile/:id" component={withSuspense(FacultyProfilePage)} />

      {/* Dashboard Pages */}
      <PrivateRoute exact path={URLS.DASHBOARD_PAGE} component={withSuspense(DashboardPage)} />

      {/* Auth Pages */}
      <GuestRoute exact path={URLS.LOGIN_PAGE} component={withSuspense(LoginPage)} />
      <GuestRoute exact path={URLS.REGISTER_PAGE} component={withSuspense(RegisterPage)} />
      <PrivateRoute exact path={URLS.LOGOUT_PAGE} component={withSuspense(LogoutPage)} />
      <Route path="*" component={withSuspense(NotFound)} />
    </Switch>
    

    //   <GuestRoute
    //     exact
    //     path={URLS.FORGET_PASSWORD_REQUEST}
    //     component={withSuspense(ForgetPasswordRequestPage)}
    //   />
    //   <GuestRoute
    //     exact
    //     path={URLS.FORGET_PASSWORD_CONFIRM}
    //     component={withSuspense(ForgetPasswordConfirmPage)}
    //   />

    //   <Route
    //     exact
    //     path={URLS.EVENT_DETAIL_PAGE}
    //     component={withSuspense(EventPage)}
    //   />

    //   <Route
    //     exact
    //     path={URLS.UPDATE_RESERVE_EVENT_REQUEST_PAGE}
    //     component={withSuspense(UpdateReserveRequestPage)}
    //   />

    //   <Route
    //     exact
    //     path={URLS.DASHBOARD_PAGE}
    //     component={withSuspense(DashboardPage)}
    //   />

    //   <Route
    //     exact
    //     path={URLS.ABOUT_US_PAGE}
    //     component={withSuspense(AboutUsPage)}
    //   />
    //   <Route
    //     exact
    //     path={URLS.FAQ_PAGE}
    //     component={withSuspense(FAQPage)}
    //   />
    //   <Route
    //     exact
    //     path={URLS.TESTIMONIAL_PAGE}
    //     component={withSuspense(TestimonialPage)}
    //   />
    //   <Route
    //     exact
    //     path={URLS.NEWSLETTER_PAGE}
    //     component={withSuspense(NewsletterPage)}
    //   />
    //   <Route
    //     exact
    //     path={URLS.ACCESS_DENIED_PAGE}
    //     component={withSuspense(AccessDeniedPage)}
    //   />
    //   <Route path={"/"} exact component={withSuspense(HomePage)} />

    //   <Route component={withSuspense(NotFoundPage)} />
    // </Switch>
  );
};

export default Routes;
