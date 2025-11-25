import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaPaw, 
  FaSearch, 
  FaUser, 
  FaSignOutAlt, 
  FaBars,
  FaHome,
  FaHeart,
  FaDollarSign
} from 'react-icons/fa';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm navbar-custom">
      <div className="container">
        {/* Logo e Título */}
        <Link to="/" className="navbar-brand d-flex align-items-center fw-bold">
          <div style={{ width: '40px', height: '40px' }}>
            <img src="/logo512.png" alt="LOGO" width={40} height={40} className="img-fluid" />
          </div>
          PawStation
        </Link>

        {/* Menu para mobile */}
        <button 
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>

        {/* Itens do menu */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <FaHome className="me-1" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/animais" className="nav-link">
                <FaHeart className="me-1" /> Animais
              </Link>
            </li>
            {isAuthenticated && user?.tipo === 'admin' && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  <FaUser className="me-1" /> Admin
                </Link>
              </li>
            )}
          </ul>

          {/* Itens da direita - muda conforme login */}
          <div className="navbar-nav">
            {isAuthenticated ? (
              // ✅ Usuário LOGADO
              <>
                <span className="navbar-text me-3">
                  Olá, <strong>{user?.nome || user?.email}</strong>
                </span>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="me-1" /> Sair
                </button>
              </>
            ) : (
              // ✅ Usuário NÃO LOGADO
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">
                  Entrar
                </Link>
                <Link to="/registrar" className="btn btn-primary">
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}