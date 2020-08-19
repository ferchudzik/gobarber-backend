import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should create a new user', async () => {
    const user = await createUser.execute({
      name: 'Fulano de Tal',
      email: 'fulano@email.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create two users with same email', async () => {
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
