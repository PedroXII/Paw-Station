import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaEnvelope, FaPhone, FaPlus, FaImage, FaExclamationTriangle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const [adocoesPendentes, setAdocoesPendentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('adocoes');
  const [novoAnimal, setNovoAnimal] = useState({
    nome: '',
    especie: '',
    raca: '',
    idade: '',
    status_saude: 'Saudável',
    status_adoção: 'Disponível',
    data_entrada: new Date().toISOString().split('T')[0],
    foto: '',
    descricao: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    carregarAdocoesPendentes();
  }, []);

  const carregarAdocoesPendentes = async () => {
    try {
      const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore');
      const { db } = await import('../firebase');
      
      const q = query(
        collection(db, 'adocoes'), 
        where('status', '==', 'Pendente'),
        orderBy('data_solicitacao', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const adocoes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setAdocoesPendentes(adocoes);
    } catch (error) {
      console.error('Erro ao carregar adoções:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAprovarAdocao = async (adocaoId, animalId, idAdotante) => {
    // ✅ IMPEDIR ADMINISTRADOR CORRUPTO - não pode aprovar para si mesmo
    if (idAdotante === user.uid) {
      alert('❌ Você não pode aprovar uma adoção para si mesmo.');
      return;
    }

    if (!window.confirm('Deseja aprovar esta adoção?')) return;

    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      const { db } = await import('../firebase');
      
      // 1. Atualizar status da adoção
      await updateDoc(doc(db, 'adocoes', adocaoId), { 
        status: 'Aprovada',
        data_aprovacao: new Date()
      });

      // 2. Atualizar status do animal para "Adotado"
      await updateDoc(doc(db, 'animais', animalId), { 
        status_adoção: 'Adotado'
      });

      alert('✅ Adoção aprovada com sucesso!');
      carregarAdocoesPendentes();
    } catch (error) {
      console.error('Erro ao aprovar adoção:', error);
      alert('❌ Erro ao aprovar adoção.');
    }
  };

  const handleRejeitarAdocao = async (adocaoId) => {
    const motivo = prompt('Digite o motivo da rejeição:');
    if (!motivo) return;

    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      const { db } = await import('../firebase');
      
      await updateDoc(doc(db, 'adocoes', adocaoId), { 
        status: 'Rejeitada',
        observacoes_administrador: motivo
      });

      alert('✅ Adoção rejeitada.');
      carregarAdocoesPendentes();
    } catch (error) {
      console.error('Erro ao rejeitar adoção:', error);
      alert('❌ Erro ao rejeitar adoção.');
    }
  };

  const handleCadastrarAnimal = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('../firebase');
      
      const animalData = {
        ...novoAnimal,
        idade: parseInt(novoAnimal.idade) || 0,
        data_entrada: new Date(novoAnimal.data_entrada),
        data_criacao: new Date()
      };

      await addDoc(collection(db, 'animais'), animalData);
      
      alert('✅ Animal cadastrado com sucesso!');
      
      // Limpar formulário
      setNovoAnimal({
        nome: '',
        especie: '',
        raca: '',
        idade: '',
        status_saude: 'Saudável',
        status_adoção: 'Disponível',
        data_entrada: new Date().toISOString().split('T')[0],
        foto: '',
        descricao: ''
      });

    } catch (error) {
      console.error('Erro ao cadastrar animal:', error);
      alert('❌ Erro ao cadastrar animal: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoAnimal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Painel do Administrador</h1>
      
      {/* Abas de Navegação */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'adocoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('adocoes')}
          >
            Adoções Pendentes ({adocoesPendentes.length})
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'animais' ? 'active' : ''}`}
            onClick={() => setActiveTab('animais')}
          >
            <FaPlus className="me-1" />
            Cadastrar Animal
          </button>
        </li>
      </ul>

      {/* Conteúdo das Abas */}
      {activeTab === 'adocoes' && (
        <div>
          <h3>Solicitações de Adoção Pendentes</h3>
          
          {adocoesPendentes.length === 0 ? (
            <div className="alert alert-info">
              Nenhuma solicitação de adoção pendente.
            </div>
          ) : (
            <div className="row">
              {adocoesPendentes.map(adocao => (
                <div key={adocao.id} className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-4">
                          <img 
                            src={adocao.animal_data?.foto || '/placeholder-animal.jpg'} 
                            alt={adocao.animal_data?.nome}
                            className="img-fluid rounded"
                            style={{ height: '120px', objectFit: 'cover' }}
                          />
                        </div>
                        <div className="col-8">
                          <h5>{adocao.animal_data?.nome}</h5>
                          <p className="mb-1">
                            <strong>Solicitante:</strong> {adocao.nome_adotante}
                          </p>
                          <p className="mb-1">
                            <FaEnvelope className="me-1" />
                            {adocao.email_adotante}
                          </p>
                          {adocao.telefone_adotante && (
                            <p className="mb-2">
                              <FaPhone className="me-1" />
                              {adocao.telefone_adotante}
                            </p>
                          )}
                          <small className="text-muted">
                            Solicitado em: {new Date(adocao.data_solicitacao?.toDate()).toLocaleDateString()}
                          </small>
                          
                          {/* ✅ ALERTA SE O ADMIN TENTAR APROVAR PARA SI MESMO */}
                          {adocao.id_adotante === user?.uid && (
                            <div className="alert alert-warning mt-2 py-2">
                              <FaExclamationTriangle className="me-1" />
                              <strong>Você não pode aprovar esta adoção:</strong> O solicitante é você mesmo.
                            </div>
                          )}
                          
                          <div className="mt-3">
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => handleAprovarAdocao(adocao.id, adocao.id_animal, adocao.id_adotante)}
                              disabled={adocao.id_adotante === user?.uid}
                            >
                              <FaCheck className="me-1" />
                              Aprovar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleRejeitarAdocao(adocao.id)}
                            >
                              <FaTimes className="me-1" />
                              Rejeitar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'animais' && (
        <div>
          <h3>Cadastrar Novo Animal</h3>
          
          <form onSubmit={handleCadastrarAnimal}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Nome do Animal *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={novoAnimal.nome}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: Rex, Luna, Thor..."
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Espécie *</label>
                  <select
                    className="form-select"
                    name="especie"
                    value={novoAnimal.especie}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Raça</label>
                  <input
                    type="text"
                    className="form-control"
                    name="raca"
                    value={novoAnimal.raca}
                    onChange={handleInputChange}
                    placeholder="Ex: Vira-lata, Labrador, Siames..."
                  />
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Idade (anos) *</label>
                  <input
                    type="number"
                    className="form-control"
                    name="idade"
                    value={novoAnimal.idade}
                    onChange={handleInputChange}
                    min="0"
                    max="30"
                    step="0.5"
                    required
                    placeholder="Ex: 2, 1.5, 4..."
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Status de Saúde *</label>
                  <select
                    className="form-select"
                    name="status_saude"
                    value={novoAnimal.status_saude}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Saudável">Saudável</option>
                    <option value="Em tratamento">Em tratamento</option>
                    <option value="Necessita cuidados especiais">Necessita cuidados especiais</option>
                    <option value="Idoso">Idoso</option>
                    <option value="Recuperação pós-cirúrgica">Recuperação pós-cirúrgica</option>
                  </select>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Data de Entrada *</label>
                  <input
                    type="date"
                    className="form-control"
                    name="data_entrada"
                    value={novoAnimal.data_entrada}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaImage className="me-1" />
                URL da Foto
              </label>
              <input
                type="url"
                className="form-control"
                name="foto"
                value={novoAnimal.foto}
                onChange={handleInputChange}
                placeholder="https://exemplo.com/foto.jpg"
              />
              <div className="form-text">
                Use imagens do Unsplash ou outro serviço. Ex: https://images.unsplash.com/photo-1552053831-71594a27632d?w=400
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição</label>
              <textarea
                className="form-control"
                name="descricao"
                rows="3"
                value={novoAnimal.descricao}
                onChange={handleInputChange}
                placeholder="Descreva a personalidade, hábitos, comportamento do animal..."
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Cadastrando...' : 'Cadastrar Animal'}
            </button>
          </form>

          {/* Preview da foto */}
          {novoAnimal.foto && (
            <div className="mt-4">
              <h5>Preview da Foto:</h5>
              <img 
                src={novoAnimal.foto} 
                alt="Preview" 
                className="img-fluid rounded"
                style={{ maxHeight: '200px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;