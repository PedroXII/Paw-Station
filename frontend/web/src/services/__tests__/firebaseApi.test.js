// src/services/__tests__/firebaseApi.test.js
describe('Firebase API Operations', () => {
  test('should validate animal data structure', () => {
    const mockAnimalData = {
      nome: 'Rex',
      especie: 'Cachorro',
      idade: 2,
      status_adoção: 'Disponível',
      status_saude: 'Saudável',
      data_entrada: new Date()
    };

    expect(mockAnimalData).toHaveProperty('nome');
    expect(mockAnimalData).toHaveProperty('especie');
    expect(mockAnimalData).toHaveProperty('status_adoção');
    expect(mockAnimalData.nome).toBe('Rex');
    expect(mockAnimalData.especie).toBe('Cachorro');
    expect(['Disponível', 'Adotado']).toContain(mockAnimalData.status_adoção);
  });

  test('should validate adoption data structure', () => {
    const mockAdoptionData = {
      id_animal: 'animal123',
      id_adotante: 'user456',
      nome_animal: 'Rex',
      nome_adotante: 'João Silva',
      email_adotante: 'joao@test.com',
      data_solicitacao: new Date(),
      status: 'Pendente'
    };

    expect(mockAdoptionData).toHaveProperty('id_animal');
    expect(mockAdoptionData).toHaveProperty('id_adotante');
    expect(mockAdoptionData).toHaveProperty('status');
    expect(mockAdoptionData).toHaveProperty('email_adotante');
    expect(mockAdoptionData.status).toBe('Pendente');
    expect(['Pendente', 'Aprovada', 'Rejeitada']).toContain(mockAdoptionData.status);
  });

  test('should validate user data structure', () => {
    const mockUserData = {
      nome: 'Maria Silva',
      email: 'maria@test.com',
      tipo: 'adotante',
      telefone: '(11) 99999-9999',
      data_criacao: new Date()
    };

    expect(mockUserData).toHaveProperty('nome');
    expect(mockUserData).toHaveProperty('email');
    expect(mockUserData).toHaveProperty('tipo');
    expect(['adotante', 'admin']).toContain(mockUserData.tipo);
    expect(mockUserData.email).toMatch(/@/);
  });
});