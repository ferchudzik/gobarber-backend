import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'Fulano de Tal',
      email: 'fulano@email.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create two users with same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

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
