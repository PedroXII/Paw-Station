import React from 'react';
import { FaHeart, FaPaw, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-custom mt-5 py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="d-flex align-items-center">
              <img src="/logo512.png" alt="LOGO" width="30" height="30" className="me-2" />
              PawStation
            </h5>
            <p className="mb-2">
              <FaHeart className="text-danger me-2" />
              Conectando animais a lares amorosos
            </p>
            <small>&copy; {new Date().getFullYear()} PawStation. Todos os direitos reservados.</small>
          </div>
          
          <div className="col-md-4 mb-3">
            <h6>Contato</h6>
            <p className="mb-1">
              <FaEnvelope className="me-2" />
              A confirmar.
            </p>
            <p className="mb-1">
              <FaPhone className="me-2" />
              A confirmar.
            </p>
          </div>
          
          <div className="col-md-4 mb-3">
            <h6>Nosso Compromisso</h6>
            <p className="small">
              Trabalhamos para garantir que cada animal encontre um lar onde receba todo o amor e cuidado que merece.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;