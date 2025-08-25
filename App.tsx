
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { FileProvider } from './contexts/FileContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import DictionaryPage from './pages/DictionaryPage';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ReviewPage from './pages/ReviewPage';

function App() {
  return (
    <AuthProvider>
      <FileProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="dictionary" element={<DictionaryPage />} />
              <Route path="review/:fileId" element={<ReviewPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </FileProvider>
    </AuthProvider>
  );
}

export default App;
