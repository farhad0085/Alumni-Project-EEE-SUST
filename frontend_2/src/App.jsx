import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Alumni from './pages/Alumni';
import NoticeBoard from './pages/Notice/NoticeBoard';
import StudyMaterials from './pages/StudyMaterials';
import Labs from './pages/Labs';
import FacultyStaff from './pages/Faculty/FacultyStaff';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import EventPage from './pages/Event/EventPage';
import EventDetailPage from './pages/Event/EventDetailPage';
import FacultyProfilePage from './pages/Faculty/FacultyProfilePage';


function App() {
  return (
    <Routes>
      {/* Main layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="alumni" element={<Alumni />} />
        <Route path="notice-board" element={<NoticeBoard />} />
        <Route path="study-materials" element={<StudyMaterials />} />
        <Route path="labs-projects" element={<Labs />} />
        <Route path="events" element={<EventPage />} />
        <Route path="events/:id" element={<EventDetailPage />} />
        <Route path="faculty-staff" element={<FacultyStaff />} />
        <Route path="faculty-profile/:id" element={<FacultyProfilePage />} />
      </Route>

      {/* Routes outside layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
