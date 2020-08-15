import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should list all providers', async () => {
    const provider1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123',
    });

    const provider2 = await fakeUsersRepository.create({
      name: 'Mary Jane',
      email: 'mary@email.com',
      password: '123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Tom Brady',
      email: 'tom@email.com',
      password: '123',
    });

    const providers = await listProviders.execute({
      userId: loggedUser.id,
    });

    expect(providers).toEqual([provider1, provider2]);
  });
});
