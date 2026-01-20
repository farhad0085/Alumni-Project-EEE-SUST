import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import NoticeBoard from './pages/Notice/NoticeBoard';
import StudyMaterials from './pages/StudyMaterials';
import FacultyStaff from './pages/Faculty/FacultyStaff';
import NotFound from './pages/NotFound';
import EventPage from './pages/Event/EventPage';
import EventDetailPage from './pages/Event/EventDetailPage';
import FacultyProfilePage from './pages/Faculty/FacultyProfilePage';
import LabsProjectsPage from './pages/Projects/LabsProjectsPage';
import LabsProjectsDetailPage from './pages/Projects/LabsProjectsDetailPage';
import AlumniPage from './pages/Alumni/AlumniPage';
import AlumniProfilePage from './pages/Alumni/AlumniProfilePage';
import BatchAlumniPage from './pages/Alumni/BatchAlumniPage';
import LoginPage from './pages/AuthPages/LoginPage/LoginPage';
import RegisterPage from './pages/AuthPages/RegisterPage/RegisterPage';


function App() {
  return (
    <Switch>
      {/* Main layout */}
      <Route exact path="/" component={Home} />
      <Route exact path="/alumni" component={AlumniPage} />
      <Route exact path="/alumni/:id" component={AlumniProfilePage} />
      <Route exact path="/batches/:session" component={BatchAlumniPage} />

      <Route not path="/notice-board" component={NoticeBoard} />
      <Route path="/study-materials" component={StudyMaterials} />
      <Route exact path="/labs-projects" component={LabsProjectsPage} />
      <Route exact path="/labs-projects/:type(lab|project)/:id" component={LabsProjectsDetailPage} />
      <Route exact path="/events" component={EventPage} />
      <Route exact path="/events/:id" component={EventDetailPage} />
      <Route path="/faculty-staff" component={FacultyStaff} />
      <Route path="/faculty-profile/:id" component={FacultyProfilePage} />

      {/* Routes outside layout */}
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
