import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

// Mock do AuthContext para usuário não logado
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    logout: jest.fn(),
  }),
}));

describe('Navbar', () => {
  test('renders logo and brand name', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText(/PawStation/i)).toBeInTheDocument();
  });

  test('shows login and register buttons when not authenticated', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText(/Entrar/i)).toBeInTheDocument();
    expect(screen.getByText(/Cadastrar/i)).toBeInTheDocument();
  });
});