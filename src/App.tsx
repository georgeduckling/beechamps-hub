import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlannerProvider } from './context/PlannerContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import PlannerPage from './pages/PlannerPage';

export default function App() {
  return (
    <PlannerProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kategorie/:slug" element={<CategoryPage />} />
          <Route path="/planovac" element={<PlannerPage />} />
        </Routes>
      </BrowserRouter>
    </PlannerProvider>
  );
}
