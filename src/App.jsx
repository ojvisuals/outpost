import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import HomePage from './pages/HomePage.jsx';
import ScanPage from './pages/ScanPage.jsx';
import ManualPage from './pages/ManualPage.jsx';
import CheckPage from './pages/CheckPage.jsx';
import ResultPage from './pages/ResultPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import HelpPage from './pages/HelpPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="scan" element={<ScanPage />} />
        <Route path="manual" element={<ManualPage />} />
        <Route path="check/:identifier" element={<CheckPage />} />
        <Route path="result/:id" element={<ResultPage />} />
        <Route path="result/:id/details" element={<ProductDetailsPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
