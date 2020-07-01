import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
  it('should create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Fulano de Tal',
      email: 'fulano@email.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create two users with same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'Fulano de Tal',
      email: 'fulano@email.com',
      password: '123',
    });

    expect(
      createUser.execute({
        name: 'Fulano de Tal',
        email: 'fulano@email.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
