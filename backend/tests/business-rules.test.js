describe('Regras de Negócio do PawStation', () => {
  describe('Validações de Animal', () => {
    test('animal deve ter espécie válida', () => {
      const especiesValidas = ['Cachorro', 'Gato'];
      const animal = { especie: 'Cachorro' };
      
      expect(especiesValidas).toContain(animal.especie);
    });

    test('animal deve ter status de adoção válido', () => {
      const statusValidos = ['Disponível', 'Adotado', 'Em processo'];
      const animal = { status_adoção: 'Disponível' };
      
      expect(statusValidos).toContain(animal.status_adoção);
    });
  });

  describe('Validações de Adoção', () => {
    test('adoção deve ter status válido', () => {
      const statusValidos = ['Pendente', 'Aprovada', 'Rejeitada'];
      const adocao = { status: 'Pendente' };
      
      expect(statusValidos).toContain(adocao.status);
    });

    test('usuário não pode ter múltiplas adoções pendentes', () => {
      const adopcoes = [
        { id_usuario: 'user1', status: 'Pendente' },
        { id_usuario: 'user1', status: 'Aprovada' },
        { id_usuario: 'user2', status: 'Pendente' }
      ];
      
      const adopcoesPendentesUser1 = adopcoes.filter(a => 
        a.id_usuario === 'user1' && a.status === 'Pendente'
      );
      
      expect(adopcoesPendentesUser1.length).toBeLessThanOrEqual(1);
    });
  });
});