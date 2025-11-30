# 🔌 Especificação de Integração - Firebase Services

## 🔐 Autenticação e Autorização

### Sistema Implementado
- **Provedor**: Firebase Authentication
- **Método**: Email/Senha
- **Tokens**: JWT Automáticos
- **Gestão**: Firebase Admin SDK (para futuras expansões)

### Fluxo de Autenticação
```javascript
// Login
const { login } = useAuth();
const result = await login(email, password);

// Registro  
const { register } = useAuth();
const result = await register(userData);

// Logout
const { logout } = useAuth();
await logout();