
import React, { useState, createContext, useContext, useMemo, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_USER } from '../constants';

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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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
