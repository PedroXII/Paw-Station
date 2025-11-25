import React from 'react';

// Mock simplificado do AuthContext para testes
const mockAuthValues = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isVolunteer: false,
  login: jest.fn(() => Promise.resolve({ success: true })),
  register: jest.fn(() => Promise.resolve({ success: true })),
  logout: jest.fn(),
};

export const AuthContext = React.createContext(mockAuthValues);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={mockAuthValues}>
      {children}
    </AuthContext.Provider>
  );
};