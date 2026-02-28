import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AboutUs } from './Pages/about_us';
import { ContactUs } from './Pages/contact_us';
import { StudyGuides } from './Pages/study_guides';
import { Main } from './Pages/main';
import { NotFound } from './Pages/not_found';
import { IB } from './Pages/IB.jsx';
import { AP } from './Pages/AP.jsx';
import { Highschool } from './Pages/highschool.jsx';
import { Form } from './Pages/form.jsx';
import { ClassResources } from './Pages/ClassResources.jsx';
import { Login } from './Pages/Login.jsx';
import { Register } from './Pages/Register.jsx';
import { Dashboard } from './Pages/Dashboard.jsx';
import { UploadResources } from './Pages/UploadResources.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { Navigation } from './components/Navigation.jsx';


export const AppRoutes = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/StudyGuides" element={<StudyGuides />} />
                <Route path="/Main" element={<Main />} />
                <Route path="/IB" element={<IB />} />
                <Route path="/AP" element={<AP />} />
                <Route path="/Highschool" element={<Highschool />} />
                <Route path="/Form" element={<Form />} />
                <Route path="/IB/:class_id" element={<ClassResources />} /> {/* Dynamic Routing */}
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <UploadResources />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;