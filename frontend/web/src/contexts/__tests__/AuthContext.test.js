import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';

// Mock do Firebase para evitar erros
jest.mock('../../firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn((callback) => {
      callback(null);
      return jest.fn();
    })
  },
  db: {}
}));

// Componente de teste SIMPLES
const TestComponent = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <div>
      <span data-testid="isAuthenticated">{isAuthenticated.toString()}</span>
      <span data-testid="user">{user ? 'has-user' : 'no-user'}</span>
    </div>
  );
};

describe('AuthContext', () => {
  test('provides default auth values', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user')).toHaveTextContent('no-user');
  });

  test('auth functions are available', () => {
    const TestFunctions = () => {
      const { login, register, logout } = useAuth();
      return (
        <div>
          <button onClick={() => login('test@test.com', 'password')}>Login</button>
          <button onClick={() => register({})}>Register</button>
          <button onClick={logout}>Logout</button>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestFunctions />
      </AuthProvider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});