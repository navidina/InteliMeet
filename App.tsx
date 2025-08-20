
import React, { useState, createContext, useContext, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import DictionaryPage from './pages/DictionaryPage';
import MainLayout from './components/MainLayout';
import { User, FileData } from './types';
import { MOCK_USER, MOCK_FILES } from './constants';

interface AuthContextType {
  user: User | null;
  login: (username: string, callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, callback: VoidFunction) => {
    setUser({ ...MOCK_USER, name: username });
    callback();
  };

  const logout = (callback: VoidFunction) => {
    setUser(null);
    callback();
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

interface FileContextType {
  files: FileData[];
  addFile: (file: FileData) => void;
}

const FileContext = createContext<FileContextType | null>(null);

export const useFiles = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFiles must be used within a FileProvider");
  }
  return context;
};

const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<FileData[]>(MOCK_FILES);

  const addFile = (file: FileData) => {
    setFiles(prevFiles => [file, ...prevFiles]);
  };
  
  const value = useMemo(() => ({ files, addFile }), [files]);

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

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
            </Route>
          </Routes>
        </HashRouter>
      </FileProvider>
    </AuthProvider>
  );
}

export default App;