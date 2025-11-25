import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { FaSearch, FaFilter, FaPaw, FaCat, FaDog } from 'react-icons/fa';

const Animals = () => {
  const [animais, setAnimais] = useState([]);
  const [filtros, setFiltros] = useState({
    especie: '',
    status: 'Disponível',
    busca: ''
  });
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    carregarAnimais();
  }, [filtros]);

  const carregarAnimais = async () => {
    try {
      setLoading(true);
      
      let q = collection(db, 'animais');
      
      // Aplicar filtros
      const conditions = [];
      if (filtros.especie) {
        conditions.push(where('especie', '==', filtros.especie));
      }
      if (filtros.status) {
        conditions.push(where('status_adoção', '==', filtros.status));
      }
      
      // Construir query com condições
      if (conditions.length > 0) {
        q = query(q, ...conditions);
      }
      
      const querySnapshot = await getDocs(q);
      const animaisData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Aplicar filtro de busca no cliente (por nome)
      const animaisFiltrados = filtros.busca 
        ? animaisData.filter(animal => 
            animal.nome.toLowerCase().includes(filtros.busca.toLowerCase())
          )
        : animaisData;

      setAnimais(animaisFiltrados);
    } catch (error) {
      console.error('Erro ao carregar animais:', error);
    } finally {
      setLoading(false);
    }
  };

  const verificarSolicitacoesAtivas = async (userId) => {
    try {
      const { collection, getDocs, query, where } = await import('firebase/firestore');
      const { db } = await import('../firebase');
      
      // Buscar solicitações pendentes do usuário
      const q = query(
        collection(db, 'adocoes'),
        where('id_adotante', '==', userId),
        where('status', '==', 'Pendente')
      );
      
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        // Verificar se alguma solicitação tem mais de 30 dias
        const trintaDiasAtras = new Date();
        trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
        
        const solicitacaoAntiga = snapshot.docs.find(doc => {
          const dataSolicitacao = doc.data().data_solicitacao?.toDate();
          return dataSolicitacao && dataSolicitacao < trintaDiasAtras;
        });
        
        if (solicitacaoAntiga) {
          return { 
            podeSolicitar: true, 
            motivo: 'Solicitação antiga pode ser substituída' 
          };
        } else {
          return { 
            podeSolicitar: false, 
            motivo: 'Você já tem uma solicitação de adoção pendente. Aguarde a resposta antes de fazer outra.' 
          };
        }
      }
      
      return { podeSolicitar: true, motivo: '' };
      
    } catch (error) {
      console.error('Erro ao verificar solicitações:', error);
      return { podeSolicitar: true, motivo: 'Erro na verificação' };
    }
  };

  const handleSolicitarAdocao = async (animal) => {
    if (!isAuthenticated || !user) {
      alert('Por favor, faça login para solicitar adoção!');
      navigate('/login');
      return;
    }

    // ✅ VERIFICAR SE JÁ TEM SOLICITAÇÃO ATIVA
    const verificacao = await verificarSolicitacoesAtivas(user.uid);
    if (!verificacao.podeSolicitar) {
      alert(`❌ ${verificacao.motivo}`);
      return;
    }

    if (!window.confirm(`Deseja solicitar a adoção do ${animal.nome}?`)) {
      return;
    }

    try {
      const adoptionData = {
        id_animal: animal.id,
        id_adotante: user.uid,
        nome_animal: animal.nome,
        nome_adotante: user.nome || user.email,
        email_adotante: user.email,
        telefone_adotante: user.telefone || '',
        data_solicitacao: new Date(),
        status: 'Pendente',
        animal_data: {
          nome: animal.nome,
          especie: animal.especie,
          raca: animal.raca,
          foto: animal.foto
        }
      };

      const { collection, addDoc } = await import('firebase/firestore');
      const { db } = await import('../firebase');
      
      const docRef = await addDoc(collection(db, 'adocoes'), adoptionData);
      console.log('Adoção criada com ID:', docRef.id);
      
      alert('✅ Solicitação de adoção enviada com sucesso! Aguarde nosso contato.');
      
      carregarAnimais();
      
    } catch (error) {
      console.error('Erro ao solicitar adoção:', error);
      alert('❌ Erro ao enviar solicitação: ' + error.message);
    }
  };

  const handleImageError = (animalId) => {
    setImageErrors(prev => ({
      ...prev,
      [animalId]: true
    }));
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Cabeçalho */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="text-center mb-3">Animais para Adoção</h1>
          <p className="text-center text-muted">
            Encontre seu novo companheiro perfeito
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome..."
              value={filtros.busca}
              onChange={(e) => setFiltros({...filtros, busca: e.target.value})}
            />
          </div>
        </div>
        
        <div className="col-md-3 mb-2">
          <select 
            className="form-select"
            value={filtros.especie}
            onChange={(e) => setFiltros({...filtros, especie: e.target.value})}
          >
            <option value="">Todas as espécies</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </select>
        </div>

        <div className="col-md-3 mb-2">
          <select 
            className="form-select"
            value={filtros.status}
            onChange={(e) => setFiltros({...filtros, status: e.target.value})}
          >
            <option value="Disponível">Disponíveis</option>
            <option value="Adotado">Adotados</option>
            <option value="">Todos os status</option>
          </select>
        </div>

        <div className="col-md-3 mb-2">
          <button 
            className="btn btn-outline-secondary w-100"
            onClick={() => setFiltros({especie: '', status: 'Disponível', busca: ''})}
          >
            <FaFilter className="me-2" />
            Limpar Filtros
          </button>
        </div>
      </div>

      {/* Grid de Animais */}
      <div className="row">
        {animais.length > 0 ? (
          animais.map(animal => (
            <div key={animal.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow-sm animal-card">
                <div className="card-img-container" style={{ height: '250px', overflow: 'hidden' }}>
                  {imageErrors[animal.id] || !animal.foto ? (
                    <div 
                      className="d-flex align-items-center justify-content-center h-100 w-100"
                      style={{
                        background: 'linear-gradient(135deg, #e1f8ff 0%, #90E6FF 100%)'
                      }}
                    >
                      <div className="text-center text-muted">
                        <FaPaw size={40} className="mb-2" />
                        <div>Imagem não disponível</div>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={animal.foto} 
                      className="card-img-top"
                      alt={animal.nome}
                      style={{ 
                        height: '100%', 
                        width: '100%', 
                        objectFit: 'cover'
                      }}
                      onError={() => handleImageError(animal.id)}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{animal.nome}</h5>
                    <span className={`badge ${
                      animal.status_adoção === 'Disponível' ? 'bg-success' : 
                      animal.status_adoção === 'Adotado' ? 'bg-secondary' : 'bg-warning'
                    }`}>
                      {animal.status_adoção}
                    </span>
                  </div>
                  
                  <p className="card-text">
                    <strong>
                      {animal.especie === 'Cachorro' ? <FaDog className="me-1" /> : <FaCat className="me-1" />}
                      Espécie:
                    </strong> {animal.especie}<br/>
                    <strong>Raça:</strong> {animal.raca || 'SRD'}<br/>
                    <strong>Idade:</strong> {animal.idade} anos<br/>
                    <strong>Saúde:</strong> {animal.status_saude}
                  </p>
                  
                  {animal.descricao && (
                    <p className="card-text text-muted small">
                      {animal.descricao}
                    </p>
                  )}
                  
                  <div className="mt-auto pt-3">
                    {animal.status_adoção === 'Disponível' ? (
                      <button 
                        className={`btn w-100 ${
                          isAuthenticated ? 'btn-primary' : 'btn-outline-primary'
                        }`}
                        onClick={() => handleSolicitarAdocao(animal)}
                      >
                        {isAuthenticated ? 'Solicitar Adoção' : 'Faça Login para Adotar'}
                      </button>
                    ) : (
                      <button className="btn btn-secondary w-100" disabled>
                        Já Adotado
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="text-muted">
              <FaPaw size={50} className="mb-3" />
              <h4>Nenhum animal encontrado</h4>
              <p>Tente ajustar os filtros ou verificar novamente mais tarde.</p>
            </div>
          </div>
        )}
      </div>

      {/* Estatísticas */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="bg-light rounded p-4 text-center">
            <h5>Encontrou seu animal ideal?</h5>
            <p className="mb-3">
              {isAuthenticated 
                ? 'Clique em "Solicitar Adoção" para iniciar o processo!'
                : 'Faça login para solicitar a adoção do seu novo amigo!'
              }
            </p>
            {!isAuthenticated && (
              <Link to="/login" className="btn btn-primary">
                Fazer Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animals;