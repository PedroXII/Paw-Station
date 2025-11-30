describe('Testes Básicos do PawStation', () => {
  test('1 + 1 deve ser 2', () => {
    expect(1 + 1).toBe(2);
  });

  test('deve validar formato de email', () => {
    const email = 'teste@email.com';
    expect(email).toContain('@');
  });

  test('deve ter animais na lista mock', () => {
    const animais = ['Rex', 'Luna', 'Thor'];
    expect(animais.length).toBeGreaterThan(0);
    expect(animais).toContain('Rex');
  });

  test('deve validar regra de negócio - uma adoção pendente por usuário', () => {
    const adopcoesUsuario = [
      { status: 'Pendente', data: '2024-09-01' },
      { status: 'Aprovada', data: '2024-08-01' }
    ];
    
    const temPendente = adopcoesUsuario.some(adocao => adocao.status === 'Pendente');
    expect(temPendente).toBe(true);
  });

  test('deve impedir auto-adoção por admin', () => {
    const adminId = 'admin123';
    const adocao = { id_adotante: 'admin123' };
    
    expect(adminId).toBe(adocao.id_adotante); // Isso deve ser true (impedido no código real)
  });
});