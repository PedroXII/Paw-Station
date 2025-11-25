import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from '../AdminDashboard';

// Mock SIMPLES do AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { 
      tipo: 'admin',
      email: 'admin@test.com'
    },
  }),
}));

// Mock SIMPLES do Firebase
jest.mock('../../firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      where: jest.fn(() => ({
        orderBy: jest.fn(() => ({
          getDocs: jest.fn(() => Promise.resolve({
            docs: []
          }))
        }))
      }))
    }))
  }
}));

describe('AdminDashboard', () => {
  test('renders admin dashboard title', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/Painel do Administrador/i)).toBeInTheDocument();
  });

  test('renders navigation tabs', () => {
    render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );

    expect(screen.getByText(/Adoções Pendentes/i)).toBeInTheDocument();
    expect(screen.getByText(/Cadastrar Animal/i)).toBeInTheDocument();
  });
});