import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Animals from '../Animals';

// Mock do AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
  }),
}));

// Mock do Firebase
jest.mock('../../firebase', () => ({
  db: {},
  collection: jest.fn(() => ({
    where: jest.fn(() => ({
      getDocs: jest.fn(() => Promise.resolve({
        docs: []
      }))
    }))
  })),
}));

describe('Animals Page', () => {
  test('renders animals page title', async () => {
    render(
      <BrowserRouter>
        <Animals />
      </BrowserRouter>
    );
    
    const titleElement = await screen.findByText(/Animais para Adoção/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders search and filter controls', () => {
    render(
      <BrowserRouter>
        <Animals />
      </BrowserRouter>
    );
    
    expect(screen.getByPlaceholderText(/Buscar por nome/i)).toBeInTheDocument();
    expect(screen.getByText(/Todas as espécies/i)).toBeInTheDocument();
    expect(screen.getByText(/Disponíveis/i)).toBeInTheDocument();
  });
});