export const auth = {
  onAuthStateChanged: jest.fn((callback) => {
    // Simula usuário não logado inicialmente
    callback(null);
    return jest.fn(); // Retorna função unsubscribe
  }),
  signInWithEmailAndPassword: jest.fn(() => 
    Promise.resolve({ 
      user: { 
        uid: 'test-uid-123', 
        email: 'test@example.com' 
      } 
    })
  ),
  createUserWithEmailAndPassword: jest.fn(() => 
    Promise.resolve({ 
      user: { 
        uid: 'test-uid-456', 
        email: 'newuser@example.com' 
      } 
    })
  ),
  signOut: jest.fn(() => Promise.resolve()),
  currentUser: null
};

// Mock do Firestore
const mockCollection = (collectionName) => ({
  where: (field, operator, value) => ({
    where: () => ({
      orderBy: () => ({
        getDocs: () => Promise.resolve({
          docs: []
        })
      }),
      getDocs: () => Promise.resolve({
        docs: []
      })
    }),
    orderBy: () => ({
      getDocs: () => Promise.resolve({
        docs: []
      })
    }),
    getDocs: () => Promise.resolve({
      docs: []
    })
  }),
  doc: (id) => ({
    getDoc: () => Promise.resolve({
      exists: () => false,
      data: () => ({})
    }),
    setDoc: () => Promise.resolve()
  }),
  getDocs: () => Promise.resolve({
    docs: []
  })
});

export const db = {
  collection: mockCollection,
  doc: (path, id) => ({
    getDoc: () => Promise.resolve({
      exists: () => false,
      data: () => ({})
    }),
    setDoc: () => Promise.resolve()
  }),
  getDoc: () => Promise.resolve({
    exists: () => false,
    data: () => ({})
  }),
  setDoc: () => Promise.resolve(),
  addDoc: () => Promise.resolve({ id: 'mock-doc-id' }),
  updateDoc: () => Promise.resolve()
};

// Exportações nomeadas para compatibilidade
export const getAuth = () => auth;
export const getFirestore = () => db;
export const collection = mockCollection;
export const doc = db.doc;
export const getDoc = db.getDoc;
export const setDoc = db.setDoc;
export const addDoc = db.addDoc;
export const updateDoc = db.updateDoc;
export const onAuthStateChanged = auth.onAuthStateChanged;
export const signInWithEmailAndPassword = auth.signInWithEmailAndPassword;
export const createUserWithEmailAndPassword = auth.createUserWithEmailAndPassword;
export const signOut = auth.signOut;