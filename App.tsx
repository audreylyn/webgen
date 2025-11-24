import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { WebsiteBuilder } from './pages/WebsiteBuilder';
import { PreviewTemplate } from './pages/PreviewTemplate';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create" element={<WebsiteBuilder />} />
          <Route path="/edit/:id" element={<WebsiteBuilder />} />
          <Route path="/preview/:id" element={<PreviewTemplate />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;