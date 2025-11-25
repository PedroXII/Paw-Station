import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';

// Mock SIMPLES do AuthContext
const mockRegister = jest.fn();
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    register: mockRegister,
  }),
}));

describe('Register Page', () => {
  test('renders register form with all fields', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar Senha/i)).toBeInTheDocument();
  });

  test('shows validation error when passwords do not match', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText(/Senha/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirmar Senha/i);
    const submitButton = screen.getByRole('button', { name: /Criar conta/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'different' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/As senhas não coincidem/i)).toBeInTheDocument();
  });

  test('allows form input', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const nomeInput = screen.getByLabelText(/Nome Completo/i);
    fireEvent.change(nomeInput, { target: { value: 'João Silva' } });
    
    expect(nomeInput.value).toBe('João Silva');
  });
});