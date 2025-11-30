# 📋 Documento de Requisitos - PawStation

## 🔄 Mudanças no Escopo - Justificativas Técnicas e de Negócio

### **Arquitetura Simplificada para MVP**
**Mudança**: Microsserviços + PostgreSQL → Firebase BaaS  
**Justificação**: 
- Eliminação da necessidade de gerenciamento de infraestrutura
- Time-to-market mais rápido para validação do conceito
- Facilidade de compartilhamento e deploy para demonstração

---

## 1. ✅ Requisitos Funcionais Implementados (RF)

| ID | Descrição | Status | Justificativa da Implementação |
|----|-----------|---------|-------------------------------|
| **RF01** | Cadastro e autenticação de usuários (administradores, adotantes) | ✅ Implementado | **Core do sistema** - necessário para personalização e segurança. Administradores criados manualmente via Firestore para controle. |
| **RF02** | Gerenciamento de animais do abrigo (cadastro, edição, status de adoção) | ✅ Implementado | **Funcionalidade essencial** - sem animais não há adoções. Histórico de saúde adiado para Fase 2. |
| **RF03** | Processo de adoção (solicitação, aprovação) | ✅ Implementado | **Razão de existir do sistema** - processo completo de solicitação e aprovação implementado. Acompanhamento pós-adoção adiado. |

## 2. 🔄 Requisitos Funcionais em Desenvolvimento (RF)

| ID | Descrição | Status | Justificativa do Adiamento |
|----|-----------|---------|---------------------------|
| **RF04** | Gestão de doações (financeiras, ração, medicamentos, registro de doadores) | ⏳ Fase 2 | Complexidade de integração com gateways de pagamento e gestão de múltiplos tipos de doação. |
| **RF05** | Controle de voluntários (escala de atividades, registro de horas) | ⏳ Fase 2 | Perfil de voluntário não crítico para MVP. Foco em administradores e adotantes primeiro. |
| **RF06** | Controle de estoque (ração, medicamentos, itens de higiene) com alertas | ⏳ Fase 2 | Sistema complexo que requer validação do fluxo de doações primeiro. |
| **RF07** | Geração de relatórios e dashboard (métricas de adoção, doações, estoque) | ⏳ Fase 2 | Funcionalidade de valor agregado após dados suficientes serem coletados. |
| **RF08** | Comunicação via notificações (e-mail, SMS, push) | ⏳ Fase 2 | Requer integrações externas complexas e custos operacionais. |

---

## 3. 🎯 Requisitos Não-Funcionais Atendidos (RNF)

| ID | Descrição | Status | Justificativa da Implementação |
|----|-----------|---------|-------------------------------|
| **RNF01** | Interface web responsiva | ✅ Atendido | **Essencial para acesso universal** - implementado com Bootstrap 5 para mobile-first. |
| **RNF02** | Segurança: Autenticação e criptografia | ✅ Atendido | **Firebase Auth** oferece segurança enterprise sem complexidade de implementação. |
| **RNF04** | Disponibilidade: Suporte a 50 usuários com uptime 99.5% | ✅ Atendido | **Vercel + Firebase** garantem alta disponibilidade sem custo de infra. |
| **RNF05** | Performance: Tempo de resposta < 3 segundos | ✅ Atendido | **Firestore** oferece performance excelente para operações CRUD. |

## 4. 🔄 Requisitos Não-Funcionais Adaptados

| ID | Planejado Originalmente | Implementado | Justificativa da Adaptação |
|----|-------------------------|---------------|---------------------------|
| **RNF01** | App móvel nativo + Web | ✅ Web Responsiva | **Custo-benefício**: App nativo teria custo 3x maior. Web atende 100% do público inicial. |
| **RNF03** | Arquitetura de microsserviços | ✅ Firebase BaaS | **Pragmatismo**: Microsserviços seriam overkill. Firebase oferece escalabilidade sem complexidade. |
| **RNF06** | Integração com gateways de pagamento | 🔄 Adiado Fase 2 | **Complexidade**: Requer conhecimento regulatório e validação de modelo de negócios. |

---

## 5. 🔒 Regras de Negócio Implementadas

### **Autenticação e Autorização** ✅
- Usuários registram-se como "adotante" por padrão
- Administradores criados manualmente via Firestore
- Rotas protegidas baseadas em tipo de usuário

**Justificativa**: Controle granular necessário para segurança. Administradores manuais previnem escalação não autorizada.

### **Processo de Adoção** ✅
- Apenas 1 solicitação pendente por usuário
- Administradores não podem auto-aprovar adoções  
- Validação de solicitações com mais de 30 dias

**Justificativa**: Prevenção de spam e garantia de processo justo. Regra de auto-aprovação evita conflitos de interesse.

### **Gestão de Animais** ✅
- Filtros por espécie, status e busca
- Controle de status (Disponível/Adotado)
- Upload de fotos via URL

**Justificativa**: UX otimizada para encontrar animais compatíveis. Status claro evita confusão.

---

## 6. 👥 Perfis de Usuários Implementados

### ✅ **Perfis em Produção**
1. **Administrador**
   - Aprovar/reprovar solicitações de adoção
   - Cadastrar e editar animais
   - Gerenciar todo o sistema

2. **Adotante** 
   - Visualizar animais disponíveis
   - Solicitar adoção de animais
   - Acompanhar status das solicitações

### 🔄 **Perfis para Fase 2**
3. **Voluntário** *(Planejado)*
4. **Doador** *(Planejado)*

**Justificativa**: Foco nos perfis essenciais para validar o core business primeiro.

---

## 7. 📊 Histórias de Usuário Implementadas

### ✅ **Para Administradores**
- *Como* administrador, *eu quero* aprovar solicitações de adoção *para* garantir que os animais vão para lares adequados.
- *Como* administrador, *eu quero* cadastrar novos animais *para* mantê-los disponíveis para adoção.

### ✅ **Para Adotantes**  
- *Como* adotante, *eu quero* filtrar animais disponíveis por espécie *para* encontrar um companheiro compatível.
- *Como* adotante, *eu quero* solicitar a adoção de um animal *para* dar um lar a um animal necessitado.

### 🔄 **Para Fase 2**
- Histórias de voluntários e doadores serão implementadas na próxima fase

---

## 8. 📈 Lições Aprendidas

### **Decisões Acertadas** ✅
- **Firebase vs PostgreSQL**: Redução drástica da complexidade
- **Web-first vs Mobile-native**: Cobertura maior de público inicialmente  
- **Funcionalidades core primeiro**: MVP entregue rapidamente para validação

### **Próximas Prioridades** 🔄
1. **Sistema de doações** (demanda validada por protetores)
2. **Comunicação por notificações** (melhoria na experiência do usuário)
3. **Relatórios básicos** (necessidade administrativa identificada)

---

**🎯 Status Geral**: MVP funcional em produção com core business validado. Pronto para expansão baseada em feedback real de usuários.