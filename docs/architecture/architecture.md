# 🏗 Documentação da Arquitetura - PawStation

## 📐 Arquitetura Implementada

### Visão Geral
A arquitetura atual segue o modelo **Frontend + BaaS (Backend as a Service)** utilizando **Firebase** como plataforma completa, substituindo a arquitetura inicial de microsserviços.

### Diagrama de Arquitetura Atual

┌─────────────────┐     ┌──────────────────┐    ┌─────────────────┐
│   Cliente Web   │ ──▶│     Firebase     │ ──▶│    Serviços     │
│    (React.js)   │     │     Platform     │    │    Externos     │
│                 │     │                  │    │                 │
│ • Components    │     │ • Authentication │    │ • Vercel        │
│ • Context API   │     │ • Firestore      │    │ • GitHub        │
│ • React Router  │     │ • Security Rules │    │                 │
└─────────────────┘     └──────────────────┘    └─────────────────┘

### Componentes do Sistema

#### 1. 🎨 Camada de Apresentação (Frontend)
- **Tecnologia**: React.js 18.3.1
- **Roteamento**: React Router DOM 6.30.2
- **UI/UX**: Bootstrap 5.3.8 + React Icons
- **Gerenciamento de Estado**: Context API + useState/useEffect

#### 2. 🔧 Camada de Serviços (Firebase BaaS)
- **Autenticação**: Firebase Authentication
- **Banco de Dados**: Cloud Firestore (NoSQL)
- **Segurança**: Firebase Security Rules
- **Storage**: Firebase Storage (para futuras imagens)

#### 3. 🚀 Camada de Infraestrutura
- **Deploy**: Vercel Platform
- **CDN**: Vercel Edge Network
- **Versionamento**: GitHub

### Fluxo de Dados

#### Autenticação
1. Cliente → Firebase Auth (login/registro)
2. Firebase Auth → Token de acesso
3. Token → Acesso às rotas protegidas

#### Operações de Dados
1. Cliente → Firestore SDK (leitura/escrita)
2. Firestore Security Rules → Validação de permissões
3. Firestore → Resposta em tempo real

### Decisões Arquiteturais

#### ✅ Decisões Implementadas
1. **Firebase vs Backend Customizado**
   - **Escolha**: Firebase Platform
   - **Justificativa**: Redução de complexidade, time-to-market mais rápido
   - **Benefícios**: Escalabilidade automática, segurança built-in

2. **Firestore vs PostgreSQL**
   - **Escolha**: Firestore (NoSQL)
   - **Justificativa**: Modelo de dados flexível para MVP
   - **Benefícios**: Sync em tempo real, fácil prototipagem

3. **Context API vs Redux**
   - **Escolha**: Context API + Hooks
   - **Justificativa**: Simplicidade para escopo atual
   - **Benefícios**: Menos boilerplate, learning curve reduzida

#### 🔄 Considerações para Escalabilidade
- Migração progressiva para microsserviços quando necessário
- Possível adição de Cloud Functions para lógica complexa
- Estratégia de cache para melhor performance

### Segurança Implementada

#### Autenticação
- Firebase Authentication com email/senha
- Tokens JWT automáticos
- Refresh token automático

#### Autorização
- Regras de segurança no Firestore
- Proteção de rotas no frontend
- Validação de permissões por tipo de usuário

#### Dados Sensíveis
- Variáveis de ambiente no Vercel
- Credenciais Firebase protegidas