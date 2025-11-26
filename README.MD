# 🐾 PawStation - Sistema de Adoção de Animais

## 1. 📋 Título e Descrição do Projeto

**Nome do Sistema**: PawStation  
**Breve Descrição**: Plataforma web para adoção de animais que conecta animais abandonados a lares amorosos de forma segura e eficiente.  
**Problema Solucionado**: Digitaliza e moderniza o processo de adoção animal, tornando-o mais acessível, transparente e organizado para protetores, abrigos e adotantes.

## 2. 🚀 Funcionalidades Implementadas

### ✅ Status: Completo

**Página Inicial (Home)**
- [x] Apresentação pública da plataforma
- [x] Estatísticas em tempo real
- [x] Lista resumida de animais disponíveis
- [x] Design responsivo e acessível

**Sistema de Autenticação**
- [x] Registro de novos usuários (tipo "adotante")
- [x] Login seguro com Firebase Authentication
- [x] Proteção de rotas baseada em tipo de usuário
- [x] Logout com confirmação

**Página de Animais**
- [x] Acesso público para visualização
- [x] Sistema de filtros (espécie, status, busca)
- [x] Visualização detalhada de cada animal
- [x] Solicitação de adoção (apenas para logados)
- [x] Controle de solicitações (1 pendente por usuário)

**Painel Administrativo**
- [x] Cadastro de novos animais
- [x] Gestão de solicitações de adoção
- [x] Aprovação/rejeição com justificativa
- [x] Visualização de dados do adotante
- [x] Prevenção de auto-adoção por administradores

## 3. 🛠 Tecnologias Utilizadas

### Linguagens de Programação
- JavaScript (ES6+)
- JSX

### Frameworks e Bibliotecas
- React 18.3.1
- React Router DOM 6.30.2
- Bootstrap 5.3.8
- React Icons 5.5.0

### Banco de Dados
- Firebase Firestore (NoSQL)
- Firebase Authentication

### Ferramentas de Desenvolvimento
- Create React App
- Jest & Testing Library
- Git & GitHub
- Vercel (Deploy)

## 4. 🏗 Arquitetura do Sistema

### Visão Geral da Arquitetura
Sistema frontend React com arquitetura baseada em componentes, integrado com serviços Firebase para backend como serviço (BaaS).

### Componentes Principais
```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.js       # Navegação principal
│   ├── Footer.js       # Rodapé
│   └── ProtectedRoute.js # Controle de acesso
├── contexts/           # Gerenciamento de estado
│   └── AuthContext.js  # Contexto de autenticação
├── pages/              # Páginas da aplicação
│   ├── Home.js         # Página inicial
│   ├── Animals.js      # Lista de animais
│   ├── Login.js        # Autenticação
│   ├── Register.js     # Registro
│   └── AdminDashboard.js # Painel administrativo
└── services/           # Integrações externas
    └── firebase.js     # Configuração Firebase
```

### Integrações Realizadas
- **Firebase Authentication**: Autenticação de usuários
- **Cloud Firestore**: Armazenamento de dados
- **React Router**: Navegação single-page application

## 5. 📥 Instruções de Instalação e Execução

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn
- Conta Firebase

### Passo a Passo para Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/paw-station.git
   cd paw-station
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   Preencha o arquivo `.env` com suas credenciais Firebase:
   ```
   REACT_APP_FIREBASE_API_KEY=sua_chave_aqui
   REACT_APP_FIREBASE_AUTH_DOMAIN=seu_dominio_aqui
   REACT_APP_FIREBASE_PROJECT_ID=seu_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
   REACT_APP_FIREBASE_APP_ID=seu_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=seu_measurement_id
   ```

4. **Execute a aplicação**
   ```bash
   npm start
   ```
   Acesse: `http://localhost:3000`

### Comandos para Execução
```bash
npm start      # Desenvolvimento
npm run build  # Build produção
npm test       # Executar testes
```

### Configurações Necessárias
- Projeto Firebase configurado com Authentication (Email/Password) e Firestore
- Regras de segurança Firestore configuradas
- Variáveis de ambiente configuradas

## 6. 🔐 Acesso ao Sistema

### URL de Acesso
**Produção**: [https://paw-station.vercel.app](https://paw-station.vercel.app)

### Credenciais de Teste
*As credenciais de administrador devem ser configuradas manualmente no Firestore, alterando o campo `tipo` para `"admin"` no documento do usuário.*

## 7. 👥 Validação com Público-Alvo

### Definição Específica do Público-Alvo
- **Protetores de animais independentes** da região metropolitana
- **Voluntários de abrigos** de pequeno e médio porte
- **Potenciais adotantes** que buscam animais para adoção responsável

### Resumo do Processo de Validação
O sistema foi apresentado para 3 protetores independentes e 1 abrigo organizado, com coleta de feedback sobre usabilidade, fluxo de adoção e funcionalidades administrativas.

### Principais Feedbacks Recebidos
- **✅ Positivo**: Interface intuitiva e processo de adoção simplificado
- **🔧 Sugestões**: 
  - Adicionar mais filtros na busca de animais
  - Melhorar visualização mobile
  - Incluir histórico de adoções

### Ajustes Implementados
- [x] Sistema de filtros aprimorado (espécie, status, busca)
- [x] Design responsivo otimizado para mobile
- [x] Controle de solicitações para evitar duplicidades
- [x] Proteção contra auto-adoção por administradores

## 8. 👨‍💻 Equipe de Desenvolvimento

### Membros da Equipe
- ILANA DAS NEVES BARBOSA - 2326948
- IONARA DOS SANTOS FERREIRA - 2326251
- JOAO PEDRO ALMEIDA SANTOS - 2327071
- LUCAS KAUÃ PORTELA DA SILVA NOGUEIRA - 2323857
- MARIA VITÓRIA SAMPAIO DA SILVA - 2323856
- VIVIAN LEIGH TEIXEIRA SALVI - 2313542

### Papéis e Contribuições Principais
- **Desenvolvimento Frontend**: Implementação de componentes React, roteamento e integração com Firebase
- **Design de Interface**: Criação da interface com Bootstrap e experiência do usuário
- **Backend & Segurança**: Configuração do Firebase, regras de segurança e autenticação
- **Testes & Qualidade**: Implementação de testes unitários e validação de funcionalidades
- **Documentação**: Elaboração da documentação técnica e do usuário

---

**Desenvolvido como projeto acadêmico** - 🎓 Disciplina de Projeto Aplicado Multiplataforma

**PawStation** - Conectando animais a lares amorosos 🐕🐈❤️