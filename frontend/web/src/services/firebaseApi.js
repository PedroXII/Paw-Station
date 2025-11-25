import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc,
  setDoc,
  query,
  where,
  orderBy 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { db, auth } from '../firebase';

// ==================== AUTENTICAÇÃO ====================
export const authAPI = {
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Buscar dados adicionais do usuário no Firestore
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      let userData = {};
      
      if (userDoc.exists()) {
        userData = userDoc.data();
      }
      
      return {
        user: {
          uid: user.uid,
          email: user.email,
          ...userData
        }
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  register: async (userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );
      const user = userCredential.user;

      // Salvar dados adicionais no Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        nome: userData.nome,
        email: userData.email,
        tipo: userData.tipo || 'adotante',
        telefone: userData.telefone,
        data_criacao: new Date()
      });

      return { success: true };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

// ==================== ANIMAIS ====================
export const animalsAPI = {
  // Buscar todos os animais (com filtros opcionais)
  getAll: async (filters = {}) => {
    try {
      let q = collection(db, 'animais');
      
      // Aplicar filtros
      if (filters.especie) {
        q = query(q, where('especie', '==', filters.especie));
      }
      if (filters.status_adoção) {
        q = query(q, where('status_adoção', '==', filters.status_adoção));
      }
      
      // Ordenar por data de entrada (mais recentes primeiro)
      q = query(q, orderBy('data_entrada', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const animais = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return animais;
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
      throw error;
    }
  },

  // Buscar animal por ID
  getById: async (id) => {
    try {
      const docRef = doc(db, 'animais', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Animal não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar animal:', error);
      throw error;
    }
  },

  // Criar novo animal (apenas admin)
  create: async (animalData) => {
    try {
      const docRef = await addDoc(collection(db, 'animais'), {
        ...animalData,
        data_entrada: new Date(animalData.data_entrada),
        data_criacao: new Date()
      });
      return { id: docRef.id, ...animalData };
    } catch (error) {
      console.error('Erro ao criar animal:', error);
      throw error;
    }
  },

  // Atualizar animal
  update: async (id, animalData) => {
    try {
      const docRef = doc(db, 'animais', id);
      await updateDoc(docRef, animalData);
      return { id, ...animalData };
    } catch (error) {
      console.error('Erro ao atualizar animal:', error);
      throw error;
    }
  }
};

// ==================== ADOÇÕES ====================
export const adoptionsAPI = {
  // Solicitar adoção
  create: async (adoptionData) => {
    try {
      const docRef = await addDoc(collection(db, 'adocoes'), {
        ...adoptionData,
        data_solicitacao: new Date(),
        status: 'Pendente'
      });
      return { 
        id: docRef.id, 
        ...adoptionData, 
        status: 'Pendente',
        message: 'Solicitação de adoção enviada com sucesso!' 
      };
    } catch (error) {
      console.error('Erro ao solicitar adoção:', error);
      throw error;
    }
  },

  // Listar adoções (com filtros para admin)
  getAll: async (filters = {}) => {
    try {
      let q = collection(db, 'adocoes');
      
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }
      
      q = query(q, orderBy('data_solicitacao', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const adoptions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return adoptions;
    } catch (error) {
      console.error('Erro ao buscar adoções:', error);
      throw error;
    }
  },

  // Atualizar status da adoção (apenas admin)
  update: async (id, adoptionData) => {
    try {
      const docRef = doc(db, 'adocoes', id);
      await updateDoc(docRef, {
        ...adoptionData,
        data_aprovacao: adoptionData.status !== 'Pendente' ? new Date() : null
      });
      return { id, ...adoptionData };
    } catch (error) {
      console.error('Erro ao atualizar adoção:', error);
      throw error;
    }
  }
};

// ==================== DOAÇÕES ====================
export const donationsAPI = {
  // Registrar doação
  create: async (donationData) => {
    try {
      const docRef = await addDoc(collection(db, 'doacoes'), {
        ...donationData,
        data: new Date()
      });
      return { id: docRef.id, ...donationData };
    } catch (error) {
      console.error('Erro ao registrar doação:', error);
      throw error;
    }
  },

  // Buscar doações (apenas admin)
  getAll: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'doacoes'));
      const donations = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return donations;
    } catch (error) {
      console.error('Erro ao buscar doações:', error);
      throw error;
    }
  }
};