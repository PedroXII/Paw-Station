import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { FaPaw, FaCat, FaDog } from 'react-icons/fa';

const Home = () => {
  const [animais, setAnimais] = useState([]);
  const [estatisticas, setEstatisticas] = useState({
    animaisDisponiveis: 0,
    totalAnimais: 0,
    adocoesMes: 0,
    animaisAdotados: 0
  });
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const animaisQuery = query(
          collection(db, 'animais'), 
          where('status_adoção', '==', 'Disponível')
        );
        const animaisSnapshot = await getDocs(animaisQuery);
        const animaisData = animaisSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAnimais(animaisData.slice(0, 6));

        // Estatísticas
        const todosAnimaisSnapshot = await getDocs(collection(db, 'animais'));
        const todosAnimais = todosAnimaisSnapshot.docs.map(doc => doc.data());

        const animaisDisponiveis = animaisData.length;
        const totalAnimais = todosAnimais.length;
        const animaisAdotados = todosAnimais.filter(a => a.status_adoção === 'Adotado').length;
        
        const adocoesSnapshot = await getDocs(collection(db, 'adocoes'));
        const adocoesData = adocoesSnapshot.docs.map(doc => doc.data());
        const adocoesMes = adocoesData.filter(adocao => 
          adocao.status === 'Aprovada'
        ).length;

        setEstatisticas({
          animaisDisponiveis,
          totalAnimais,
          adocoesMes,
          animaisAdotados
        });

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, []);

  const handleImageError = (animalId) => {
    setImageErrors(prev => ({
      ...prev,
      [animalId]: true
    }));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-sky text-dark rounded-4 my-4">
        <div className="container-fluid py-5">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-5 col-md-10 mb-4 mb-lg-0 px-4">
              <div className="ps-lg-4">
                <h1 className="display-4 fw-bold mb-4">Encontre seu novo melhor amigo</h1>
                <p className="mb-0 fs-5">Centenas de animais esperando por um lar cheio de amor e carinho.</p>
                <div className="mt-4">
                  <Link to="/animais" className="btn btn-light btn-lg shadow-sm px-4 py-3">
                    Ver Animais para Adoção
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-10 text-center px-4">
              <div className="mb-4">
                <img 
                  src="/cao-adoravel-no-parque-na-natureza-com-o-proprietario.jpg" 
                  alt="PawStation Logo" 
                  width="1500" 
                  height="1000"
                  className="img-fluid rounded-4 shadow-sm"
                />
              </div>
              <h3 className="mb-3">🐾 PawStation</h3>
              <p className="mb-0 fs-5">Conectando animais a lares amorosos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="container-cloud py-4 rounded-4 mt-4">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="text-primary">{estatisticas.animaisDisponiveis}</h3>
                  <p className="mb-0">Animais Disponíveis</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="text-success">{estatisticas.animaisAdotados}</h3>
                  <p className="mb-0">Animais Adotados</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="text-info">{estatisticas.adocoesMes}</h3>
                  <p className="mb-0">Adoções Este Mês</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="text-warning">{estatisticas.totalAnimais}</h3>
                  <p className="mb-0">Total de Animais</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Animais Disponíveis */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="text-center mb-5">Animais Disponíveis para Adoção</h2>
            </div>
          </div>
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
                        <span className="badge bg-success">
                          Disponível
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
                          {animal.descricao.substring(0, 100)}...
                        </p>
                      )}
                      
                      <div className="mt-auto pt-3">
                        <Link 
                          to="/animais" 
                          className="btn btn-primary w-100"
                        >
                          Ver Detalhes
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <div className="text-muted">
                  <FaPaw size={50} className="mb-3" />
                  <h4>Nenhum animal disponível no momento</h4>
                  <p>Volte mais tarde para conhecer nossos novos amigos!</p>
                </div>
              </div>
            )}
          </div>
          {animais.length > 0 && (
            <div className="row mt-4">
              <div className="col-12 text-center">
                <Link to="/animais" className="btn btn-outline-primary btn-lg">
                  Ver Todos os Animais
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Como Funciona */}
      <section className="container-grass py-5 rounded-4 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="text-center mb-5">Como Funciona a Adoção</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-4 text-center mb-4">
              <div className="bg-white rounded-circle p-4 mx-auto shadow-sm mb-3 d-flex align-items-center justify-content-center" style={{width: '120px', height: '120px'}}>
                <span style={{fontSize: '3rem'}}>🔍</span>
              </div>
              <h4>1. Encontre</h4>
              <p>Navegue pelos nossos animais disponíveis e encontre seu companheiro ideal.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-white rounded-circle p-4 mx-auto shadow-sm mb-3 d-flex align-items-center justify-content-center" style={{width: '120px', height: '120px'}}>
                <span style={{fontSize: '3rem'}}>📝</span>
              </div>
              <h4>2. Candidate-se</h4>
              <p>Preencha o formulário de adoção e aguarde nosso contato.</p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="bg-white rounded-circle p-4 mx-auto shadow-sm mb-3 d-flex align-items-center justify-content-center" style={{width: '120px', height: '120px'}}>
                <span style={{fontSize: '3rem'}}>🏠</span>
              </div>
              <h4>3. Adote</h4>
              <p>Conheça pessoalmente e leve seu novo amigo para casa!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;