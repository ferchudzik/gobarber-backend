import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserProfileService from './ShowUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showUserProfile: ShowUserProfileService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUserProfile = new ShowUserProfileService(fakeUsersRepository);
  });

  it('should show an user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123',
    });

    const userProfile = await showUserProfile.execute({
      userId: user.id,
    });

    expect(userProfile.name).toBe('John Doe');
    expect(userProfile.email).toBe('john@email.com');
  });

  it('should not show an user profile from non-existing user', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123',
    });

    await expect(
      showUserProfile.execute({
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
