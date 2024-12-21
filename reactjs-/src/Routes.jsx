import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AboutUs } from './Pages/about_us';
import { ContactUs } from './Pages/contact_us';
import { StudyGuides } from './Pages/study_guides';
import { Main } from './Pages/main';
import { NotFound } from './Pages/not_found';
import { IB } from './Pages/IB.jsx';
import { AP } from './Pages/AP.jsx';
import { Highschool } from './Pages/highschool.jsx';

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
                <Route path="/IB" element={<IB />} />
                <Route path="/AP" element={<AP />} />
                <Route path="/Highschool" element={<Highschool />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;