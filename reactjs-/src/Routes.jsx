import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AboutUs } from './Pages/about_us';
import { ContactUs } from './Pages/contact_us';
import { StudyGuides } from './Pages/study_guides';
import { Main } from './Pages/main';
import { NotFound } from './Pages/not_found';

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/AboutUs" element={<AboutUs />} />
                <Route path="/ContactUs" element={<ContactUs />} />
                <Route path="/StudyGuides" element={<StudyGuides />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/Main" element={<Main />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;