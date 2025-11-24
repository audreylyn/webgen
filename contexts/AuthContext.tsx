import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Mock user session
  const [user, setUser] = useState<User>({
    id: 'u1',
    name: 'Demo User',
    role: 'admin' // Default to admin for first load
  });

  const switchRole = (role: UserRole) => {
    setUser(prev => ({ ...prev, role }));
  };

  return (
    <AuthContext.Provider value={{ user, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};