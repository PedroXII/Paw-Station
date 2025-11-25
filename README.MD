# 🐾 PawStation - Sistema de Adoção de Animais

## 📋 Objetivo do Projeto

O **PawStation** é uma plataforma web desenvolvida para facilitar o processo de adoção de animais, conectando animais abandonados a lares amorosos. O sistema visa modernizar e digitalizar o processo de adoção, tornando-o mais acessível, transparente e eficiente para todas as partes envolvidas.

**Vinculação com ODS 11**: O projeto contribui para o Objetivo de Desenvolvimento Sustentável 11 - "Cidades e Comunidades Sustentáveis", promovendo o bem-estar animal e a conscientização sobre posse responsável, elementos essenciais para comunidades mais harmoniosas e sustentáveis.

## 🚀 Funcionalidades Implementadas

### ✅ Página Inicial (Home)
- Apresentação pública da plataforma
- Estatísticas em tempo real (animais disponíveis, adotados, adoções do mês)
- Lista resumida de animais disponíveis para adoção
- Explicação do processo de adoção em 3 etapas simples
- Design responsivo e acessível

### ✅ Sistema de Autenticação
- **Registro de novos usuários** (tipo "adotante" por padrão)
- **Login seguro** com Firebase Authentication
- **Proteção de rotas** baseada em tipo de usuário
- **Logout** com confirmação

### ✅ Página de Animais
- **Acesso público** para visualização de animais
- **Sistema de filtros** por espécie, status e busca por nome
- **Visualização detalhada** de cada animal
- **Solicitação de adoção** (apenas para usuários logados)
- **Controle de solicitações** (máximo 1 solicitação pendente por usuário)

### ✅ Painel Administrativo
- **Cadastro de novos animais** com formulário completo
- **Gestão de solicitações de adoção** pendentes
- **Aprovação/rejeição** de adoções com justificativa
- **Visualização de dados do adotante** (nome, e-mail, telefone)
- **Prevenção de auto-adoção** por administradores

### ✅ Funcionalidades de Segurança
- Proteção de rotas administrativas
- Validação de formulários no frontend e backend
- Controle de permissões por tipo de usuário
- Prevenção de solicitações duplicadas

## 🛠 Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca principal
- **React Router DOM 6.30.2** - Roteamento
- **Bootstrap 5.3.8** - Framework de UI
- **React Icons 5.5.0** - Ícones
- **Axios 1.13.2** - Requisições HTTP

### Backend & Banco de Dados
- **Firebase Authentication** - Autenticação de usuários
- **Firestore Database** - Banco de dados NoSQL
- **Firebase Security Rules** - Regras de segurança

### Ferramentas de Desenvolvimento
- **Create React App** - Ambiente de desenvolvimento
- **Jest & Testing Library** - Testes unitários
- **Git & GitHub** - Controle de versão

## 🏗 Arquitetura do Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   HOME          │    │   ANIMALS       │    │   ADMIN         │
│                 │    │                 │    │                 │
│ - Pública       │    │ - Pública       │    │ - Privada       │
│ - Lista resumida│    │ - Lista completa│    │ - Apenas admin  │
│ - Estatísticas  │◄──►│ - Filtros       │◄──►│ - Gerir adoções │
│ - Links         │    │ - Adoção*       │    │ - Cadastrar     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                      │                      │
         │                      │                      │
         └──────────────────────┼──────────────────────┘
                                │
                                ▼
                        ┌─────────────────┐
                        │    AUTH         │
                        │                 │
                        │ - Firebase      │
                        │ - Login/Registro│
                        └─────────────────┘
```

## 📥 Instruções de Instalação e Execução

### Pré-requisitos
- Node.js 16+ instalado
- Conta no Firebase
- Git instalado

### Passo a Passo para Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/PedroXII/paw-station.git
   cd paw-station/frontend/web
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o Firebase**
   - Crie um projeto no Firebase Console
   - Ative Authentication com Email/Password
   - Crie um banco Firestore
   - Copie as credenciais para o arquivo `src/firebase.js`

4. **Execute a aplicação**
   ```bash
   npm start
   ```
   A aplicação estará disponível em `http://localhost:3000`

### Configuração do Firebase

Crie o arquivo `src/firebase.js` com:

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  authDomain: "paw-station.firebaseapp.com",
  projectId: "paw-station",
  storageBucket: "paw-station.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

## 🔐 Credenciais de Teste

### Conta de Administrador
- **Email**: `admin@pawstation.com`
- **Senha**: `admin123`

### Conta de Usuário Comum
- **Email**: `user@email.com`
- **Senha**: `123456`

*Nota: As contas de administrador precisam ser configuradas manualmente no Firestore, alterando o campo `tipo` para `"admin"*

## 🌐 Deploy e Acesso

### Versão em Produção
**URL**: [https://paw-station.web.app](https://paw-station.web.app)

### Deploy com Firebase Hosting
```bash
# Build da aplicação
npm run build

# Deploy
firebase deploy
```

## 🧪 Testes

### Executar Testes
```bash
# Todos os testes
npm test

# Testes específicos
npm test -- --testNamePattern="Home"
```

### Cobertura de Testes
- ✅ Testes de componentes (Navbar, Login, Home, Animals)
- ✅ Testes de páginas principais
- ✅ Testes de contexto de autenticação
- ✅ Testes de serviços Firebase

## 👥 Validação com Público-Alvo

### Público-Alvo Específico
O projeto foi validado com:
- **Protetores de animais independentes** da região
- **Voluntários de abrigos** locais
- **Potenciais adotantes** que buscaram animais recentemente

### Principais Feedbacks Implementados
- Simplificação do processo de adoção
- Melhoria na usabilidade mobile
- Adição de filtros mais intuitivos
- Informações mais claras sobre o status dos animais

## 👨‍💻 Equipe de Desenvolvimento

**Equipe PawStation** - Projeto desenvolvido para a disciplina de Projeto Aplicado Multiplataforma

### Contribuições Principais
- **Desenvolvimento Frontend**: Implementação de todas as interfaces React
- **Integração Backend**: Conexão com Firebase Auth e Firestore
- **Design System**: Criação de componentes com Bootstrap
- **Testes**: Implementação de suite de testes unitários

## 📞 Suporte

Para dúvidas ou problemas com a aplicação:
1. Verifique a configuração do Firebase
2. Confirme que todas as dependências foram instaladas
3. Consulte os logs do console para erros específicos

---

**PawStation** - Conectando animais a lares amorosos 🐕🐈❤️