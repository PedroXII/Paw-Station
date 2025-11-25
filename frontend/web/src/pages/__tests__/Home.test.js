import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

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
  getDocs: jest.fn(() => Promise.resolve({
    docs: []
  }))
}));

describe('Home Page', () => {
  test('renders main title', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    // Verifica se o título principal está na página
    const titleElement = await screen.findByText(/Encontre seu novo melhor amigo/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders call to action button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    const button = screen.getByText(/Ver Animais para Adoção/i);
    expect(button).toBeInTheDocument();
  });
});