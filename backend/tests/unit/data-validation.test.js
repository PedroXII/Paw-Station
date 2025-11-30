// Testes de validação de dados
describe('Data Validation Tests', () => {
  
  describe('Animal Data Validation', () => {
    const validAnimal = {
      nome: 'Rex',
      especie: 'Cachorro',
      idade: 2,
      status_saude: 'Saudável',
      status_adoção: 'Disponível',
      data_entrada: '2024-01-15'
    };

    it('should validate required fields', () => {
      const requiredFields = ['nome', 'especie', 'idade', 'status_adoção'];
      const isValid = requiredFields.every(field => validAnimal[field]);
      
      expect(isValid).toBe(true);
    });

    it('should validate species', () => {
      const validSpecies = ['Cachorro', 'Gato'];
      const isValid = validSpecies.includes(validAnimal.especie);
      
      expect(isValid).toBe(true);
    });

    it('should validate age range', () => {
      const isValid = validAnimal.idade >= 0 && validAnimal.idade <= 30;
      expect(isValid).toBe(true);
    });

    it('should validate adoption status', () => {
      const validStatus = ['Disponível', 'Adotado', 'Em processo'];
      const isValid = validStatus.includes(validAnimal.status_adoção);
      
      expect(isValid).toBe(true);
    });
  });

  describe('Adoption Data Validation', () => {
    const validAdoption = {
      id_animal: 'animal123',
      id_adotante: 'user456',
      nome_animal: 'Rex',
      nome_adotante: 'João Silva',
      email_adotante: 'joao@email.com',
      status: 'Pendente'
    };

    it('should validate adoption required fields', () => {
      const requiredFields = ['id_animal', 'id_adotante', 'nome_animal', 'nome_adotante', 'email_adotante'];
      const isValid = requiredFields.every(field => validAdoption[field]);
      
      expect(isValid).toBe(true);
    });

    it('should validate adoption status', () => {
      const validStatus = ['Pendente', 'Aprovada', 'Rejeitada'];
      const isValid = validStatus.includes(validAdoption.status);
      
      expect(isValid).toBe(true);
    });
  });
});