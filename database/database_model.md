# 🗃 Modelo de Dados - Firestore

## 📊 Visão Geral das Coleções

O modelo migrou de PostgreSQL relacional para **Firestore NoSQL** com as seguintes coleções principais:

### Coleção: `usuarios`
```javascript
{
  uid: "string (Firebase Auth ID)",
  nome: "string",
  email: "string", 
  tipo: "adotante" | "admin",  // Admin criado manualmente
  telefone: "string",
  data_criacao: "timestamp"
}

```
### Coleção: `animais`
```javascript
{
  id: "string (auto Firestore ID)",
  nome: "string",
  especie: "Cachorro" | "Gato",
  raca: "string",
  idade: "number",
  status_saude: "Saudável" | "Em tratamento" | ...,
  status_adoção: "Disponível" | "Adotado",
  data_entrada: "timestamp",
  foto: "string (URL)",
  descricao: "string",
  data_criacao: "timestamp"
}

```
### Coleção: `adocoes`
```javascript
{
  id: "string (auto Firestore ID)",
  id_animal: "string",
  id_adotante: "string",
  nome_animal: "string",
  nome_adotante: "string", 
  email_adotante: "string",
  telefone_adotante: "string",
  data_solicitacao: "timestamp",
  status: "Pendente" | "Aprovada" | "Rejeitada",
  data_aprovacao: "timestamp?",
  observacoes_administrador: "string?",
  animal_data: {
    nome: "string",
    especie: "string", 
    raca: "string",
    foto: "string"
  }
}

```
### 🔗 Relacionamentos
#### 1. Usuários ↔ Adoções
adocoes.id_adotante → usuarios.uid

Um usuário pode ter múltiplas adoções

#### 2. Animais ↔ Adoções
adocoes.id_animal → animais.id

Um animal pode ter múltiplas solicitações de adoção

#### 3. Usuários ↔ (Futuro) Doações
Planejado para Fase 2