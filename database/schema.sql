-- =============================================
-- Schema: PawStation Database
-- Baseado na estrutura real do Firebase Firestore
-- Gerado a partir das coleções: usuarios, animais, adocoes
-- =============================================

CREATE DATABASE pawstation;
\c pawstation;

-- =============================================
-- Table: usuarios
-- Baseada na coleção 'usuarios' do Firestore
-- =============================================
CREATE TABLE usuarios (
    uid VARCHAR(255) PRIMARY KEY,  -- Firebase Auth UID
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    tipo VARCHAR(20) NOT NULL DEFAULT 'adotante',  -- 'adotante' ou 'admin'
    telefone VARCHAR(20),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_tipo_usuario CHECK (tipo IN ('adotante', 'admin'))
);

-- =============================================
-- Table: animais  
-- Baseada na coleção 'animais' do Firestore
-- =============================================
CREATE TABLE animais (
    id VARCHAR(255) PRIMARY KEY,  -- Firestore Document ID
    nome VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raca VARCHAR(100),
    idade INTEGER NOT NULL,
    status_saude VARCHAR(100) NOT NULL DEFAULT 'Saudável',
    status_adoção VARCHAR(20) NOT NULL DEFAULT 'Disponível',
    data_entrada DATE NOT NULL,
    foto TEXT,  -- URL da imagem
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT chk_especie CHECK (especie IN ('Cachorro', 'Gato')),
    CONSTRAINT chk_status_adocao CHECK (status_adoção IN ('Disponível', 'Adotado'))
);

-- =============================================
-- Table: adocoes
-- Baseada na coleção 'adocoes' do Firestore
-- =============================================
CREATE TABLE adocoes (
    id VARCHAR(255) PRIMARY KEY,  -- Firestore Document ID
    id_animal VARCHAR(255) NOT NULL,
    id_adotante VARCHAR(255) NOT NULL,
    nome_animal VARCHAR(100) NOT NULL,
    nome_adotante VARCHAR(100) NOT NULL,
    email_adotante VARCHAR(255) NOT NULL,
    telefone_adotante VARCHAR(20),
    data_solicitacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL DEFAULT 'Pendente',
    data_aprovacao TIMESTAMP,
    observacoes_administrador TEXT,
    
    -- Campos do snapshot do animal (como no Firestore)
    animal_nome VARCHAR(100),
    animal_especie VARCHAR(50),
    animal_raca VARCHAR(100),
    animal_foto TEXT,
    
    FOREIGN KEY (id_animal) REFERENCES animais(id) ON DELETE CASCADE,
    FOREIGN KEY (id_adotante) REFERENCES usuarios(uid) ON DELETE CASCADE,
    CONSTRAINT chk_status_adocao CHECK (status IN ('Pendente', 'Aprovada', 'Rejeitada'))
);

-- =============================================
-- Table: doacoes (PARA FASE 2)
-- Baseada na coleção planejada 'doacoes'
-- =============================================
CREATE TABLE doacoes (
    id VARCHAR(255) PRIMARY KEY,
    id_doador VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,  -- 'financeira', 'ração', 'medicamento'
    valor VARCHAR(255) NOT NULL,  -- Valor em R$ ou descrição do item
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descricao TEXT,
    
    FOREIGN KEY (id_doador) REFERENCES usuarios(uid) ON DELETE CASCADE,
    CONSTRAINT chk_tipo_doacao CHECK (tipo IN ('financeira', 'ração', 'medicamento', 'outros'))
);

-- =============================================
-- Indexes para performance
-- =============================================
CREATE INDEX idx_animais_especie ON animais(especie);
CREATE INDEX idx_animais_status ON animais(status_adoção);
CREATE INDEX idx_animais_data_entrada ON animais(data_entrada);
CREATE INDEX idx_adocoes_status ON adocoes(status);
CREATE INDEX idx_adocoes_data_solicitacao ON adocoes(data_solicitacao);
CREATE INDEX idx_adocoes_adotante ON adocoes(id_adotante);
CREATE INDEX idx_usuarios_tipo ON usuarios(tipo);

-- =============================================
-- Views para relatórios (PARA FASE 2)
-- =============================================

-- View: Estatísticas de animais
CREATE VIEW view_estatisticas_animais AS
SELECT 
    COUNT(*) as total_animais,
    COUNT(CASE WHEN status_adoção = 'Disponível' THEN 1 END) as animais_disponiveis,
    COUNT(CASE WHEN status_adoção = 'Adotado' THEN 1 END) as animais_adotados,
    COUNT(CASE WHEN especie = 'Cachorro' THEN 1 END) as total_cachorros,
    COUNT(CASE WHEN especie = 'Gato' THEN 1 END) as total_gatos
FROM animais;

-- View: Adoções pendentes
CREATE VIEW view_adocoes_pendentes AS
SELECT 
    a.id,
    a.nome_animal,
    a.nome_adotante,
    a.email_adotante,
    a.data_solicitacao,
    an.especie,
    an.raca
FROM adocoes a
JOIN animais an ON a.id_animal = an.id
WHERE a.status = 'Pendente'
ORDER BY a.data_solicitacao DESC;

-- =============================================
-- Comentários das tabelas
-- =============================================
COMMENT ON TABLE usuarios IS 'Armazena informações de usuários do sistema (adotantes e administradores)';
COMMENT ON TABLE animais IS 'Cadastro de animais disponíveis para adoção';
COMMENT ON TABLE adocoes IS 'Registro de solicitações e status de adoções';
COMMENT ON TABLE doacoes IS 'Registro de doações financeiras e materiais (FASE 2)';

COMMENT ON COLUMN usuarios.uid IS 'ID único do Firebase Authentication';
COMMENT ON COLUMN animais.id IS 'ID único do documento Firestore (para compatibilidade)';
COMMENT ON COLUMN adocoes.id IS 'ID único do documento Firestore (para compatibilidade)';
COMMENT ON COLUMN adocoes.animal_nome IS 'Snapshot do nome do animal no momento da solicitação';