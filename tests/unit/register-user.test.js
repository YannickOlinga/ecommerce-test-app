const { registerUser } = require('../../src/domain/register-user');

describe('registerUser', () => {
  function createFakeRepository() {
    const users = [];
    return {
      users,
      create: jest.fn(async ({ email, password }) => {
        const user = { id: users.length + 1, email, password };
        users.push(user);
        return user;
      }),
    };
  }

  function createFakeEmailService() {
    return {
      sendWelcome: jest.fn(async () => true),
    };
  }

  test('crée l\'utilisateur avec un email et mot de passe valides', async () => {
    const repo = createFakeRepository();
    const emailService = createFakeEmailService();

    const user = await registerUser(
      { email: 'nouveau@example.com', password: 'Motdepasse1!' },
      repo,
      emailService
    );

    expect(user.email).toBe('nouveau@example.com');
    expect(repo.create).toHaveBeenCalledTimes(1);
  });

  test('envoie l\'email de bienvenue à la bonne adresse', async () => {
    const repo = createFakeRepository();
    const emailService = createFakeEmailService();

    await registerUser(
      { email: 'nouveau@example.com', password: 'Motdepasse1!' },
      repo,
      emailService
    );

    expect(emailService.sendWelcome).toHaveBeenCalledWith('nouveau@example.com');
  });

  test('retourne l\'utilisateur créé', async () => {
    const repo = createFakeRepository();
    const emailService = createFakeEmailService();

    const user = await registerUser(
      { email: 'nouveau@example.com', password: 'Motdepasse1!' },
      repo,
      emailService
    );

    expect(user).toMatchObject({ id: 1, email: 'nouveau@example.com' });
  });

  test('refuse un email invalide', async () => {
    const repo = createFakeRepository();
    const emailService = createFakeEmailService();

    await expect(
      registerUser({ email: 'invalide', password: 'Motdepasse1!' }, repo, emailService)
    ).rejects.toThrow('Email invalide');
  });
});
