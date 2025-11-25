import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

// Mock SIMPLES do AuthContext
const createMockAuth = (isAuthenticated = false, isAdmin = false) => ({
  isAuthenticated,
  isAdmin,
  user: isAuthenticated ? { email: 'test@test.com' } : null
});

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(() => createMockAuth(false, false))
}));

const ProtectedContent = () => <div>Conteúdo Protegido</div>;
const PublicContent = () => <div>Conteúdo Público</div>;

describe('ProtectedRoute', () => {
  test('redirects when not authenticated', () => {
    const { useAuth } = require('../../contexts/AuthContext');
    useAuth.mockImplementation(() => createMockAuth(false, false));

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicContent />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <ProtectedContent />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText('Conteúdo Público')).toBeInTheDocument();
    expect(screen.queryByText('Conteúdo Protegido')).not.toBeInTheDocument();
  });

  test('allows access when authenticated', () => {
    const { useAuth } = require('../../contexts/AuthContext');
    useAuth.mockImplementation(() => createMockAuth(true, false));

    render(
      <BrowserRouter>
        <Routes>
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <ProtectedContent />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText('Conteúdo Protegido')).toBeInTheDocument();
  });
});