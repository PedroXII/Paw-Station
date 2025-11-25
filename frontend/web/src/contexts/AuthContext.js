import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: user.uid,
              email: user.email,
              ...userData
            });
          } else {
            setUser({
              uid: user.uid,
              email: user.email
            });
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          setUser({
            uid: user.uid,
            email: user.email
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // ✅ FUNÇÃO LOGIN
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      let userData = {};
      
      if (userDoc.exists()) {
        userData = userDoc.data();
      }
      
      const completeUser = {
        uid: user.uid,
        email: user.email,
        ...userData
      };
      
      setUser(completeUser);
      return { success: true, user: completeUser };

    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: "Email ou senha inválidos" };
    }
  };

  // ✅ FUNÇÃO REGISTRO (ADICIONAR ESTA FUNÇÃO)
  const register = async (userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        nome: userData.nome,
        email: userData.email,
        tipo: 'adotante',
        telefone: userData.telefone,
        data_criacao: new Date()
      });

      const completeUser = {
        uid: user.uid,
        email: user.email,
        nome: userData.nome,
        tipo: 'adotante',
        telefone: userData.telefone
      };
      
      setUser(completeUser);
      return { success: true, user: completeUser };

    } catch (error) {
      console.error('Erro no registro:', error);
      
      let errorMessage = 'Erro ao criar conta. Tente novamente.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email já está em uso.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      }
      
      return { success: false, error: errorMessage };
    }
  };

  // ✅ FUNÇÃO LOGOUT
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const value = {
    user,
    login,
    register, // ✅ Agora a função existe
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.tipo === 'admin',
    isVolunteer: user?.tipo === 'voluntario',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};